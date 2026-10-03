import hashlib
from typing import Dict, List, Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(
    title="LandDNA Engine",
    description="Smart Land Verification & Explainable Fraud Engine for LandTech 2026",
)

# CORS enabled kora hocche jate frontend theke call kora jay
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Schemas ---
class DocumentRecord(BaseModel):
    doc_id: str
    doc_type: str
    content_text: str
    file_hash: Optional[str] = None


class OwnershipEvent(BaseModel):
    year: int
    seller_name: str
    buyer_name: str
    deed_no: str
    area_sold: float


class LandParcel(BaseModel):
    plot_no: str
    khatian_no: str
    total_area: float
    current_owner: str
    history: List[OwnershipEvent] = []
    documents: List[DocumentRecord] = []


class InconsistencyFlag(BaseModel):
    severity: str
    issue: str
    evidence: str


class LandDNAReport(BaseModel):
    plot_no: str
    khatian_no: str
    current_owner: str
    total_area: float
    flags: List[InconsistencyFlag]
    status: str
    timeline: List[OwnershipEvent]


# --- Synthetic In-Memory Database ---
SYNTHETIC_REGISTRY: Dict[str, LandParcel] = {
    "125": LandParcel(
        plot_no="125",
        khatian_no="456",
        total_area=5.00,
        current_owner="Person B",
        history=[
            OwnershipEvent(
                year=2005,
                seller_name="Abdul Karim",
                buyer_name="Person A",
                deed_no="DEED-2005-01",
                area_sold=5.00,
            ),
            OwnershipEvent(
                year=2015,
                seller_name="Person A",
                buyer_name="Person B",
                deed_no="DEED-2015-99",
                area_sold=5.00,
            ),
        ],
        documents=[],
    ),
    "204": LandParcel(
        plot_no="204",
        khatian_no="912",
        total_area=6.00,
        current_owner="Kamrul Hasan",
        history=[
            OwnershipEvent(
                year=2020,
                seller_name="Original",
                buyer_name="Abdur Rauf",
                deed_no="DEED-2020-11",
                area_sold=6.00,
            ),
            OwnershipEvent(
                year=2022,
                seller_name="Abdur Rauf",
                buyer_name="Buyer X",
                deed_no="DEED-2022-891",
                area_sold=4.00,
            ),
            OwnershipEvent(
                year=2023,
                seller_name="Selim Chowdhury",
                buyer_name="Kamrul Hasan",
                deed_no="DEED-2023-F91",
                area_sold=6.00,
            ),
        ],
        documents=[],
    ),
}

def generate_sha256(content: str) -> str:
    return hashlib.sha256(content.encode("utf-8")).hexdigest()

@app.post("/api/documents/register-hash")
def register_document(plot_no: str, doc: DocumentRecord):
    if plot_no not in SYNTHETIC_REGISTRY:
        raise HTTPException(status_code=404, detail="Plot number paoya jayni")

    doc.file_hash = generate_sha256(doc.content_text)
    SYNTHETIC_REGISTRY[plot_no].documents.append(doc)
    return {
        "message": "Hash successfully create hoyeche",
        "doc_id": doc.doc_id,
        "hash": doc.file_hash,
    }

@app.get("/api/landdna/verify/{plot_no}", response_model=LandDNAReport)
def verify_land(plot_no: str):
    if plot_no not in SYNTHETIC_REGISTRY:
        raise HTTPException(status_code=404, detail="Dag number record-e nei")

    parcel = SYNTHETIC_REGISTRY[plot_no]
    inconsistencies: List[InconsistencyFlag] = []

    # 1. Total area mismatch & double selling check
    total_area_transferred = sum(event.area_sold for event in parcel.history)
    if total_area_transferred > (parcel.total_area * 1.2):
        inconsistencies.append(
            InconsistencyFlag(
                severity="CRITICAL",
                issue="Potential Double-Selling / Excess Sale Detected",
                evidence=f"Total area {parcel.total_area} decimal, kintu deeds er jogfol {total_area_transferred} decimal.",
            )
        )

    # 2. Chain of title check
    for i in range(1, len(parcel.history)):
        prev_buyer = parcel.history[i - 1].buyer_name
        current_seller = parcel.history[i].seller_name
        if prev_buyer.lower() != current_seller.lower():
            inconsistencies.append(
                InconsistencyFlag(
                    severity="CRITICAL",
                    issue="Broken Chain of Title",
                    evidence=f"Sal {parcel.history[i].year}-e seller '{current_seller}', kintu purber buyer chilen '{prev_buyer}'.",
                )
            )

    # 3. Rapid flip check
    for i in range(1, len(parcel.history)):
        time_diff = parcel.history[i].year - parcel.history[i - 1].year
        if time_diff <= 1:
            inconsistencies.append(
                InconsistencyFlag(
                    severity="WARNING",
                    issue="Suspicious Rapid Succession Transfer",
                    evidence=f"Khub kom shomoyer moddhe ({parcel.history[i].year}) transfer kora hoyeche.",
                )
            )

    system_status = "INCONSISTENCIES_DETECTED" if inconsistencies else "VERIFIED_CONSISTENT"

    return LandDNAReport(
        plot_no=parcel.plot_no,
        khatian_no=parcel.khatian_no,
        current_owner=parcel.current_owner,
        total_area=parcel.total_area,
        flags=inconsistencies,
        status=system_status,
        timeline=parcel.history,
    )