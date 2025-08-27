"use client"

import { useState } from "react"
import { Card, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Check } from "lucide-react"
import { TicketDetailsForm } from "./forms/ticket-details-form"
import { SalesChannelForm } from "./forms/sales-channel-form"
import { MembershipChannelForm } from "./forms/membership-channel-form"
import { GeneralSaleForm } from "./forms/general-sale-form"
import { TicketCollectionForm } from "./forms/ticket-collection-form"
import { FeesForm } from "./forms/fees-form"
import { PromoterForm } from "./forms/promoter-form"
import { PreviewForm } from "./forms/preview-form"

export interface TicketFormData {
  // Stage 1: Ticket Details
  clientNo: string
  service: string
  eventNameEn: string
  eventNameShortEn: string
  eventNameTh: string
  venueEn: string
  venueTh: string
  showDates: Array<{
    round: string
    date: string
    showTime: string
    doorTime: string
    notes?: string
  }>
  eventType: string
  ticketType: string
  festivalStanding: string
  standingQueue: string
  posCodeRequired: string
  webCodeRequired: string
  ticketInsurance: string
  accidentInsurance: string

  // Stage 2: Sales Channel
  authorizedBranches: string

  // Stage 3: Membership Channel
  membershipChannels: Array<{
    channel: string
    openDate: string
    openTime: string
    closeDate: string
    closeTime: string
    expiryMinutes: number
    limitPerTransaction: number
    limitPerIdCard: string
  }>

  generalSaleChannels: Array<{
    channel: string
    openDate: string
    openTime: string
    closeDate: string
    closeTime: string
    expiryMinutes: number
    limitPerTransaction: number
    limitPerIdCard: string
  }>
  membershipOpenDateTime: string
  generalOpenDateTime: string
  membershipCloseDateTime: string
  generalCloseDateTime: string
  venueTicketSales: string

  venuePickup: string
  branchPrintTicket: string
  sevenElevenPrint: string
  sevenElevenStartDate: string
  sevenElevenEndDate: string
  showTimeOnTicket: string
  postalDeadline: string
  addressFormDeadline: string
  addressEditDeadline: string
  genTextFile: string
  useDiscount: string

  // Stage 6: Fees
  issueFee: string
  issueFeeAmount: string
  issueFeePayedBy: string
  plasticCardFee: string
  csFee: string
  shippingFee: string
  creditCardFee: string
  creditCardFeeRate: string
  creditCardFeePayedBy: string
  truemoneyFee: string
  truemoneyFeeRate: string
  truemoneyFeePayedBy: string
  thaiQrFee: string
  thaiQrFeeRate: string
  thaiQrFeePayedBy: string
  alipayFee: string
  alipayFeeRate: string
  alipayFeePayedBy: string
  wechatFee: string
  wechatFeeRate: string
  wechatFeePayedBy: string
  checkDuplicateChannel: string
  checkReserveLimitType: string
  webPosLimit: string
  webLimit: string
  webLimitDescription: string
  webPosXLimit: string

  // Stage 7: Promoter
  promoterName: string
  companyCode: string
  promoterAbbreviation: string
  promoterAddress: string
  promoterPhone: string
  promoterTaxId: string
}

const stages = [
  { id: 1, name: "รายละเอียดการจำหน่ายบัตร", nameEn: "Ticket Sales Details" },
  { id: 2, name: "ข้อมูลช่องทางการขาย", nameEn: "Sales Channel Information" },
  { id: 3, name: "ช่องทางการขาย BEUS MEMBERSHIP", nameEn: "BEUS Membership Channels" },
  { id: 4, name: "ช่องทางการขาย รอบจำหน่ายบัตรทั่วไป (General Sale)", nameEn: "General Sale Channels" },
  { id: 5, name: "เงื่อนไขการรับบัตร", nameEn: "Ticket Collection Conditions" },
  { id: 6, name: "ค่าธรรมเนียม", nameEn: "Fees" },
  { id: 7, name: "รายละเอียดผู้จัด (Promoter)", nameEn: "Promoter Details" },
  { id: 8, name: "ตรวจสอบข้อมูล", nameEn: "Review & Submit" },
]

export function MultiStageTicketForm() {
  const [currentStage, setCurrentStage] = useState(1)
  const [completedStages, setCompletedStages] = useState<number[]>([])
  const [formData, setFormData] = useState<TicketFormData>({
    clientNo: "810",
    service: "01",
    eventNameEn: "",
    eventNameShortEn: "",
    eventNameTh: "",
    venueEn: "",
    venueTh: "",
    showDates: [],
    eventType: "",
    ticketType: "",
    festivalStanding: "",
    standingQueue: "",
    posCodeRequired: "",
    webCodeRequired: "",
    ticketInsurance: "",
    accidentInsurance: "",
    authorizedBranches: "",
    membershipChannels: [],
    generalSaleChannels: [],
    membershipOpenDateTime: "",
    generalOpenDateTime: "",
    membershipCloseDateTime: "",
    generalCloseDateTime: "",
    venueTicketSales: "",
    venuePickup: "",
    branchPrintTicket: "",
    sevenElevenPrint: "",
    sevenElevenStartDate: "",
    sevenElevenEndDate: "",
    showTimeOnTicket: "",
    postalDeadline: "",
    addressFormDeadline: "",
    addressEditDeadline: "",
    genTextFile: "",
    useDiscount: "",
    issueFee: "มี",
    issueFeeAmount: "30",
    issueFeePayedBy: "ลูกค้า",
    plasticCardFee: "ลูกค้ารับภาระค่าบัตรพลาสติกใบละ 20 บาท",
    csFee: "ไม่มี",
    shippingFee: "ไม่มี",
    creditCardFee: "มี",
    creditCardFeeRate: "3.25",
    creditCardFeePayedBy: "ลูกค้า",
    truemoneyFee: "มี",
    truemoneyFeeRate: "3.00",
    truemoneyFeePayedBy: "ลูกค้า",
    thaiQrFee: "มี",
    thaiQrFeeRate: "1.50",
    thaiQrFeePayedBy: "ลูกค้า",
    alipayFee: "ไม่มี",
    alipayFeeRate: "3.00",
    alipayFeePayedBy: "ลูกค้า",
    wechatFee: "ไม่มี",
    wechatFeeRate: "3.00",
    wechatFeePayedBy: "ลูกค้า",
    checkDuplicateChannel: "CHANNEL",
    checkReserveLimitType: "WEB/POS",
    webPosLimit: "0: สามารถจองไม่มี limit",
    webLimit: "1: X ครั้ง /ID card /Event id Reserve,Confirm,Paid x =10",
    webLimitDescription: "2 : ตรวจสอบ/ ID card/ Event ID ถ้ามีรายการ Status Reserve ,Confirm",
    webPosXLimit: "3 : ตรวจสอบ X seat/ID ard /Event id ทุก status (Reserve,Confirm,Paid) X=10",
    promoterName: "บริษัท ซันเรย์ มิวสิค จำกัด",
    companyCode: "T000321",
    promoterAbbreviation: "TDE",
    promoterAddress: "2034/106-107 ชั้น 24 อาคารอิตัลไทย ทาวเวอร์ ถนนเพชรบุรีตัดใหม่ แขวงบางกะปิ เขตห้วยขวาง กรุงเทพมหานคร 10310",
    promoterPhone: "0952296535",
    promoterTaxId: "0105562207817",
  })

  const updateFormData = (data: Partial<TicketFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const handleNext = () => {
    if (currentStage < stages.length) {
      setCompletedStages((prev) => [...prev.filter((s) => s !== currentStage), currentStage])
      setCurrentStage(currentStage + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStage > 1) {
      setCurrentStage(currentStage - 1)
    }
  }

  const handleStageClick = (stageId: number) => {
    setCurrentStage(stageId)
  }

  const handleSubmit = () => {
    console.log("Form submitted:", formData)
    alert("ส่งข้อมูลเรียบร้อยแล้ว / Form submitted successfully!")
  }

  const progress = ((currentStage - 1) / (stages.length - 1)) * 100

  const renderStageContent = () => {
    switch (currentStage) {
      case 1:
        return <TicketDetailsForm data={formData} onUpdate={updateFormData} onNext={handleNext} />
      case 2:
        return (
          <SalesChannelForm data={formData} onUpdate={updateFormData} onNext={handleNext} onPrevious={handlePrevious} />
        )
      case 3:
        return (
          <MembershipChannelForm
            data={formData}
            onUpdate={updateFormData}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        )
      case 4:
        return (
          <GeneralSaleForm data={formData} onUpdate={updateFormData} onNext={handleNext} onPrevious={handlePrevious} />
        )
      case 5:
        return (
          <TicketCollectionForm
            data={formData}
            onUpdate={updateFormData}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        )
      case 6:
        return <FeesForm data={formData} onUpdate={updateFormData} onNext={handleNext} onPrevious={handlePrevious} />
      case 7:
        return (
          <PromoterForm data={formData} onUpdate={updateFormData} onNext={handleNext} onPrevious={handlePrevious} />
        )
      case 8:
        return (
          <PreviewForm data={formData} onEdit={handleStageClick} onSubmit={handleSubmit} onPrevious={handlePrevious} />
        )
      default:
        return null
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Progress Header */}
      <Card className="shadow-sm">
        <CardHeader className="pb-6">
          <div className="space-y-6">
            <Progress value={progress} className="h-2" />
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {stages.map((stage) => (
                <div
                  key={stage.id}
                  className="flex flex-col items-center space-y-3 cursor-pointer group p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  onClick={() => handleStageClick(stage.id)}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                      completedStages.includes(stage.id)
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : currentStage === stage.id
                          ? "bg-accent text-accent-foreground shadow-sm ring-2 ring-primary/20"
                          : "bg-muted text-muted-foreground group-hover:bg-muted-foreground/10"
                    }`}
                  >
                    {completedStages.includes(stage.id) ? <Check className="w-5 h-5" /> : stage.id}
                  </div>
                  <div className="text-center space-y-1">
                    <div className="text-sm font-medium text-foreground leading-tight">{stage.name}</div>
                    <div className="text-xs text-muted-foreground/70 leading-tight">{stage.nameEn}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Current Stage Content */}
      <div className="min-h-[700px] space-y-6">{renderStageContent()}</div>
    </div>
  )
}
