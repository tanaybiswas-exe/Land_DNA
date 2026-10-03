import hashlib
from datetime import datetime
from typing import Dict, List, Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(
    title="LandDNA Enterprise Engine",
    description="Smart Land Verification, Forensic Ledger & Multi-Survey Cross-Matcher",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------- Data Models -----------------
class DocumentRecord(BaseModel):
    doc_id: str
    doc_type: str
    content_text: str
    file_hash: Optional[str] = None
    crypto_timestamp: Optional[str] = None

class OwnershipEvent(BaseModel):
    year: int
    seller_name: str
    buyer_name: str
    deed_no: str
    area_sold: float

class SurveyRecord(BaseModel):
    generation: str  # CS, SA, RS, BS
    khatian_no: str
    plot_no: str
    recorded_area: float
    owner_recorded: str

class HeirShare(BaseModel):
    relation: str
    name: str
    share_fraction: str
    entitled_area: float

class InconsistencyFlag(BaseModel):
    severity: str
    issue: str
    evidence: str

class LandParcel(BaseModel):
    plot_no: str
    khatian_no: str
    total_area: float
    current_owner: str
    history: List[OwnershipEvent] = []
    documents: List[DocumentRecord] = []
    surveys: List[SurveyRecord] = []
    heirs: List[HeirShare] = []

class LandDNAReport(BaseModel):
    plot_no: str
    khatian_no: str
    current_owner: str
    total_area: float
    remaining_balance: float
    flags: List[InconsistencyFlag]
    status: str
    timeline: List[OwnershipEvent]
    surveys: List[SurveyRecord]
    heirs: List[HeirShare]
    plain_bangla_summary: str

# ----------------- Synthetic Database (Rule 8) -----------------
SYNTHETIC_REGISTRY: Dict[str, LandParcel] = {
    "125": LandParcel(
        plot_no="125",
        khatian_no="456",
        total_area=5.00,
        current_owner="Anisur Rahman (Person B)",
        history=[
            OwnershipEvent(year=2005, seller_name="Abdul Karim", buyer_name="Person A", deed_no="DEED-2005-01", area_sold=5.00),
            OwnershipEvent(year=2015, seller_name="Person A", buyer_name="Person B", deed_no="DEED-2015-884", area_sold=5.00),
        ],
        surveys=[
            SurveyRecord(generation="CS (1940)", khatian_no="12", plot_no="88", recorded_area=5.00, owner_recorded="Rahimuddin"),
            SurveyRecord(generation="SA (1962)", khatian_no="34", plot_no="90", recorded_area=5.00, owner_recorded="Kafiluddin"),
            SurveyRecord(generation="RS (1985)", khatian_no="456", plot_no="125", recorded_area=5.00, owner_recorded="Abdul Karim"),
            SurveyRecord(generation="BS (2012)", khatian_no="789", plot_no="125", recorded_area=5.00, owner_recorded="Person B")
        ],
        heirs=[
            HeirShare(relation="Son (পুত্র)", name="Tariqul Islam", share_fraction="2/3", entitled_area=3.33),
            HeirShare(relation="Daughter (কন্যা)", name="Fatema Begum", share_fraction="1/3", entitled_area=1.67)
        ]
    ),
    "204": LandParcel(
        plot_no="204",
        khatian_no="912",
        total_area=6.00,
        current_owner="Kamrul Hasan (Flagged Claim)",
        history=[
            OwnershipEvent(year=2020, seller_name="Original Authority", buyer_name="Abdur Rauf", deed_no="DEED-2020-11", area_sold=6.00),
            OwnershipEvent(year=2022, seller_name="Abdur Rauf", buyer_name="Buyer X", deed_no="DEED-2022-891", area_sold=4.00),
            OwnershipEvent(year=2023, seller_name="Selim Chowdhury", buyer_name="Kamrul Hasan", deed_no="DEED-2023-F91", area_sold=6.00),
        ],
        surveys=[
            SurveyRecord(generation="CS (1940)", khatian_no="101", plot_no="150", recorded_area=6.00, owner_recorded="Sheikh Mojid"),
            SurveyRecord(generation="SA (1962)", khatian_no="190", plot_no="152", recorded_area=6.00, owner_recorded="Sheikh Hashem"),
            SurveyRecord(generation="RS (1985)", khatian_no="320", plot_no="204", recorded_area=6.00, owner_recorded="Abdur Rauf"),
            SurveyRecord(generation="BS (2012)", khatian_no="912", plot_no="204", recorded_area=8.50, owner_recorded="Mismatch Record")
        ],
        heirs=[
            HeirShare(relation="Wife (স্ত্রী)", name="Rokeya Begum", share_fraction="1/8", entitled_area=0.75),
            HeirShare(relation="Son (পুত্র)", name="Jahid Rauf", share_fraction="7/8", entitled_area=5.25)
        ]
    )
}

def generate_sha256(content: str) -> str:
    return hashlib.sha256(content.encode("utf-8")).hexdigest()

@app.post("/api/documents/register-hash")
def register_document(plot_no: str, doc: DocumentRecord):
    if plot_no not in SYNTHETIC_REGISTRY:
        raise HTTPException(status_code=404, detail="Plot number record-e paoya jayni")

    doc.file_hash = generate_sha256(doc.content_text)
    doc.crypto_timestamp = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S UTC")
    SYNTHETIC_REGISTRY[plot_no].documents.append(doc)
    return {
        "message": "Document SHA-256 Hash shofolbhabe registered hoyeche",
        "doc_id": doc.doc_id,
        "hash": doc.file_hash,
        "crypto_timestamp": doc.crypto_timestamp
    }

@app.get("/api/landdna/verify/{plot_no}", response_model=LandDNAReport)
def verify_land(plot_no: str):
    if plot_no not in SYNTHETIC_REGISTRY:
        raise HTTPException(status_code=404, detail="Dag number record-e nei")

    parcel = SYNTHETIC_REGISTRY[plot_no]
    inconsistencies: List[InconsistencyFlag] = []

    # ১. দাগ ব্যালেন্স লেজার চেক (Plot Balance Sheet - P3)
    total_sold = sum(event.area_sold for event in parcel.history)
    if total_sold > parcel.total_area:
        inconsistencies.append(
            InconsistencyFlag(
                severity="CRITICAL",
                issue="দাগ ব্যালেন্স অতিরিক্ত বিক্রয় (Insufficient Balance in Plot)",
                evidence=f"দাগের মোট জমি {parcel.total_area} শতক, কিন্তু হস্তান্তরের সর্বমোট পরিমাণ {total_sold} শতক।",
            )
        )

    # ২. চেইন অব টাইটেল চেক (Chain of Title Continuity)
    for i in range(1, len(parcel.history)):
        prev_buyer = parcel.history[i - 1].buyer_name
        current_seller = parcel.history[i].seller_name
        if prev_buyer.lower() != current_seller.lower():
            inconsistencies.append(
                InconsistencyFlag(
                    severity="CRITICAL",
                    issue="চেইন অব টাইটেল বিচ্ছিন্ন (Broken Chain of Title)",
                    evidence=f"সাল {parcel.history[i].year}-এ বিক্রেতা '{current_seller}', অথচ পূর্বের ক্রেতা ছিলেন '{prev_buyer}'।",
                )
            )

    # ৩. অস্বাভাবিক দ্রুত হস্তান্তর চেক (Rapid Flip)
    for i in range(1, len(parcel.history)):
        time_diff = parcel.history[i].year - parcel.history[i - 1].year
        if time_diff <= 1:
            inconsistencies.append(
                InconsistencyFlag(
                    severity="WARNING",
                    issue="অস্বাভাবিক দ্রুত হস্তান্তর (Suspicious Rapid Flip)",
                    evidence=f"স্বল্প সময়ের ব্যবধানে একাধিক দলিলের রেকর্ড পাওয়া গেছে ({parcel.history[i].year})।",
                )
            )

    # ৪. সিএস-এসএ-আরএস-বিএস খতিয়ান রূপান্তর ট্র্যাকার (Survey Cross-Matcher - P1 & P2)
    for i in range(1, len(parcel.surveys)):
        prev_area = parcel.surveys[i-1].recorded_area
        curr_area = parcel.surveys[i].recorded_area
        if abs(curr_area - prev_area) > 0.5:
            inconsistencies.append(
                InconsistencyFlag(
                    severity="WARNING",
                    issue=f"জরিপ রূপান্তরে অসামঞ্জস্য ({parcel.surveys[i-1].generation} ➔ {parcel.surveys[i].generation})",
                    evidence=f"পূর্বের জরিপে জমি ছিল {prev_area} শতক, পরবর্তী জরিপে রেজিস্টার্ড কারণ ছাড়াই পরিবর্তন হয়ে {curr_area} শতক হয়েছে।",
                )
            )

    # ৬. এআই-ভিত্তিক সরল বাংলা দলিল সারসংক্ষেপক (AI Deed Simplifier - P1 & P5)
    if inconsistencies:
        bangla_summary = f"এই জমিটিতে মোট {len(inconsistencies)}টি অসঙ্গতি পাওয়া গেছে। দাগের মোট পরিমাণের চেয়ে বেশি জমি বিক্রির চেষ্টা এবং দলিলের চেইনে গরমিল রয়েছে। বায়না বা ক্রয়ের পূর্বে আইনি নিষ্পত্তি জরুরি।"
        system_status = "INCONSISTENCIES_DETECTED"
    else:
        bangla_summary = f"জমিটির মালিকানা রেকর্ড, সিএস থেকে বিএস জরিপের ধারাবাহিকতা এবং দলিলের চেইন সম্পূর্ণ সুসংগত। দাগে কোনো অতিরিক্ত বিক্রয় বা অসামঞ্জস্য পাওয়া যায়নি।"
        system_status = "VERIFIED_CONSISTENT"

    return LandDNAReport(
        plot_no=parcel.plot_no,
        khatian_no=parcel.khatian_no,
        current_owner=parcel.current_owner,
        total_area=parcel.total_area,
        remaining_balance=max(0.0, parcel.total_area - total_sold),
        flags=inconsistencies,
        status=system_status,
        timeline=parcel.history,
        surveys=parcel.surveys,
        heirs=parcel.heirs,
        plain_bangla_summary=bangla_summary
    )