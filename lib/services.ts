export interface ServiceTimelineItem {
  step: string;
  detail: string;
}

export interface ServiceFaqItem {
  question: string;
  answer: string;
}

export interface Service {
  slug: string;
  name: string;
  shortDescription: string;
  category: string;
  icon: string;
  overview: string;
  whatToExpect: string[];
  timeline: ServiceTimelineItem[];
  faqs: ServiceFaqItem[];
  relatedSlugs: string[];
}

export const services: Service[] = [
  {
    slug: "ivf-assisted-reproduction",
    name: "IVF & Assisted Reproduction",
    shortDescription: "Advanced fertility treatments including IVF, ICSI, and individualized protocols.",
    category: "Core Care",
    icon: "🧬",
    overview:
      "Our IVF and assisted reproduction program combines evidence-based clinical pathways with personalized cycle planning to maximize success and safety.",
    whatToExpect: [
      "Initial fertility assessment for both partners",
      "Protocol planning with medication guidance",
      "Monitoring scans and hormone tracking",
      "Embryology updates and transfer planning",
    ],
    timeline: [
      { step: "Consultation", detail: "Comprehensive couple assessment and treatment strategy." },
      { step: "Cycle Preparation", detail: "Ovarian stimulation protocol and baseline investigations." },
      { step: "Procedure Phase", detail: "Egg retrieval, fertilization, embryo development, transfer." },
      { step: "Follow-Up", detail: "Post-transfer monitoring, support, and next-step planning." },
    ],
    faqs: [
      { question: "How long does one IVF cycle take?", answer: "A typical IVF cycle takes 4 to 6 weeks from preparation to post-transfer testing." },
      { question: "Is IVF painful?", answer: "Most steps are well tolerated; procedures are performed with comfort-focused protocols." },
      { question: "Do both partners need evaluation?", answer: "Yes, fertility assessment for both partners helps optimize treatment outcomes." },
    ],
    relatedSlugs: ["intrauterine-insemination", "male-infertility", "decreased-amh"],
  },
  {
    slug: "gynecological-care",
    name: "Gynecological Care",
    shortDescription: "Preventive and therapeutic care for hormonal, menstrual, and reproductive health.",
    category: "Core Care",
    icon: "🩺",
    overview:
      "We provide comprehensive gynecological care across all age groups, with a focus on early diagnosis, prevention, and individualized management.",
    whatToExpect: [
      "Detailed symptom review and menstrual history",
      "Screening and diagnostic imaging when needed",
      "Medical and lifestyle treatment options",
      "Long-term follow-up for sustained health",
    ],
    timeline: [
      { step: "Evaluation", detail: "Clinical consultation and baseline diagnostic planning." },
      { step: "Diagnosis", detail: "Condition-specific tests and interpretation." },
      { step: "Care Plan", detail: "Medication, monitoring, and preventive recommendations." },
      { step: "Review", detail: "Progress reassessment and adjustments." },
    ],
    faqs: [
      { question: "When should I see a gynecologist?", answer: "Any persistent menstrual, pelvic, hormonal, or reproductive concerns should be evaluated promptly." },
      { question: "Can care plans be personalized?", answer: "Yes, plans are tailored based on age, symptoms, fertility goals, and medical history." },
      { question: "Do I need regular follow-ups?", answer: "Regular reviews help track progress and prevent long-term complications." },
    ],
    relatedSlugs: ["pcos-care", "endometriosis", "ovulation-disorders"],
  },
  {
    slug: "fertility-preservation",
    name: "Fertility Preservation",
    shortDescription: "Proactive options to preserve future reproductive potential.",
    category: "Core Care",
    icon: "❄️",
    overview:
      "Our fertility preservation services support women and couples who wish to delay conception or protect fertility before medical treatment.",
    whatToExpect: [
      "Risk and timeline assessment",
      "Cryopreservation planning",
      "Cycle coordination with specialist teams",
      "Storage and future use counseling",
    ],
    timeline: [
      { step: "Assessment", detail: "Reserve testing and reproductive planning." },
      { step: "Preparation", detail: "Cycle scheduling and protocol briefing." },
      { step: "Preservation", detail: "Egg/embryo preservation with lab support." },
      { step: "Future Planning", detail: "Review of storage, legal, and usage pathways." },
    ],
    faqs: [
      { question: "Who should consider fertility preservation?", answer: "Patients delaying pregnancy, or those before surgeries and oncology treatments, may benefit." },
      { question: "Is preservation only for cancer patients?", answer: "No, it is useful for many medical and personal fertility planning scenarios." },
      { question: "How is preserved material used later?", answer: "Stored eggs or embryos can be used in future assisted reproduction cycles." },
    ],
    relatedSlugs: ["oncology-support", "decreased-amh", "ivf-assisted-reproduction"],
  },
  {
    slug: "reproductive-surgery",
    name: "Reproductive Surgery",
    shortDescription: "Minimally invasive procedures to restore reproductive anatomy and function.",
    category: "Core Care",
    icon: "🏥",
    overview:
      "Our surgical fertility unit performs targeted laparoscopic and hysteroscopic procedures to manage structural causes of infertility.",
    whatToExpect: [
      "Pre-surgical imaging and case review",
      "Minimally invasive procedure planning",
      "Post-operative recovery guidance",
      "Fertility-focused follow-up strategy",
    ],
    timeline: [
      { step: "Surgical Assessment", detail: "Imaging, risks, and procedure options." },
      { step: "Procedure", detail: "Laparoscopy/hysteroscopy by specialist team." },
      { step: "Recovery", detail: "Pain control, discharge advice, and warning signs." },
      { step: "Fertility Plan", detail: "Post-surgery conception planning and monitoring." },
    ],
    faqs: [
      { question: "When is surgery recommended?", answer: "Surgery is considered when structural abnormalities affect fertility or symptoms." },
      { question: "Are these procedures minimally invasive?", answer: "Yes, most are done through minimally invasive techniques with faster recovery." },
      { question: "Can surgery improve conception chances?", answer: "In selected cases, correcting anatomy can significantly improve fertility outcomes." },
    ],
    relatedSlugs: ["laparoscopy-hysteroscopy", "uterine-polyps", "tubal-blocks"],
  },
  {
    slug: "oncology-support",
    name: "Oncology Support",
    shortDescription: "Integrated fertility and women’s oncology guidance during treatment pathways.",
    category: "Core Care",
    icon: "🛡️",
    overview:
      "We coordinate with oncology teams to support reproductive planning, symptom care, and long-term health before, during, and after treatment.",
    whatToExpect: [
      "Joint oncology-fertility consultation",
      "Urgency-based fertility planning",
      "Treatment-compatible reproductive advice",
      "Continuity care after active treatment",
    ],
    timeline: [
      { step: "Referral", detail: "Onco-fertility risk evaluation and timelines." },
      { step: "Planning", detail: "Preservation and symptom care strategy." },
      { step: "Coordination", detail: "Parallel follow-up with oncology team." },
      { step: "Post-Treatment", detail: "Recovery, surveillance, and reproductive planning." },
    ],
    faqs: [
      { question: "Can fertility be preserved before cancer therapy?", answer: "Yes, in many cases preservation can be planned quickly before treatment starts." },
      { question: "Will oncology care delay fertility planning?", answer: "No, we coordinate both pathways to prioritize safety and timeline efficiency." },
      { question: "Do I need long-term follow-up?", answer: "Yes, coordinated follow-up supports both reproductive and general women’s health." },
    ],
    relatedSlugs: ["fertility-preservation", "gynecological-care", "decreased-amh"],
  },
  {
    slug: "counseling-support",
    name: "Counseling & Support",
    shortDescription: "Emotional and decision support for individuals and couples through treatment.",
    category: "Core Care",
    icon: "🤝",
    overview:
      "Our counseling team helps patients navigate stress, decisions, communication, and expectations during fertility and gynecological treatment.",
    whatToExpect: [
      "Initial psychological and emotional assessment",
      "Individual/couple counseling sessions",
      "Coping tools for treatment-related stress",
      "Ongoing support through major milestones",
    ],
    timeline: [
      { step: "Intake", detail: "Identify concerns, stressors, and support goals." },
      { step: "Counseling Plan", detail: "Set structured sessions and coping framework." },
      { step: "Guided Support", detail: "Emotional tools during procedures and outcomes." },
      { step: "Wellbeing Review", detail: "Long-term resilience and relationship support." },
    ],
    faqs: [
      { question: "Is counseling only for complex cases?", answer: "No, counseling is beneficial for anyone seeking clarity and emotional support." },
      { question: "Can partners attend sessions?", answer: "Yes, couples counseling is encouraged where helpful." },
      { question: "Does counseling continue during treatment?", answer: "Yes, sessions can be aligned with treatment milestones." },
    ],
    relatedSlugs: ["ivf-assisted-reproduction", "male-infertility", "oncology-support"],
  },
  {
    slug: "male-infertility",
    name: "Male Infertility Evaluation and Treatment",
    shortDescription: "Comprehensive diagnostic evaluation and treatment solutions for male factor infertility.",
    category: "Focused Treatments",
    icon: "🧪",
    overview:
      "Male infertility accounts for approximately 40-50% of all infertility cases. At Wings Women Center, we provide thorough evaluation and personalized treatment plans to address male factor challenges.",
    whatToExpect: [
      "Detailed semen analysis (count, motility, morphology)",
      "Hormonal assessment (testosterone, FSH, LH)",
      "Physical examination and medical history",
      "Advanced sperm function tests when needed",
      "Genetic counseling for severe cases",
    ],
    timeline: [
      { step: "Initial Consultation", detail: "Comprehensive evaluation and semen analysis" },
      { step: "Diagnosis", detail: "Identify underlying causes through tests" },
      { step: "Treatment Plan", detail: "Customized approach based on findings" },
      { step: "Follow-up", detail: "Monitor progress and adjust treatment" },
    ],
    faqs: [
      { question: "What causes male infertility?", answer: "Low sperm count, poor motility, abnormal morphology, blockages, hormonal issues, or genetic factors." },
      { question: "How long does treatment take?", answer: "Varies from 3-6 months depending on the underlying cause." },
      { question: "Is male infertility treatable?", answer: "Yes, many cases can be successfully treated with appropriate medical intervention." },
    ],
    relatedSlugs: ["semen-abnormalities", "intrauterine-insemination", "ivf-assisted-reproduction"],
  },
  {
    slug: "ovulation-induction-timed-intercourse",
    name: "Ovulation Induction and Timed Intercourse",
    shortDescription: "Cycle tracking and induction protocols to support natural conception timing.",
    category: "Focused Treatments",
    icon: "🗓️",
    overview:
      "Ovulation induction helps women who have irregular or absent ovulation to produce eggs, increasing the chances of natural conception through timed intercourse.",
    whatToExpect: [
      "Cycle mapping and medication plan",
      "Follicular monitoring via ultrasound",
      "Timed intercourse recommendations",
      "LH surge detection",
      "Post-ovulation confirmation",
    ],
    timeline: [
      { step: "Cycle Day Evaluation", detail: "Baseline scan and medication start" },
      { step: "Monitoring", detail: "Follicle growth tracking and dose tuning" },
      { step: "Timing", detail: "Ovulation trigger and intercourse timing advice" },
      { step: "Luteal Support", detail: "Progesterone supplementation if needed" },
    ],
    faqs: [
      { question: "Who benefits from ovulation induction?", answer: "Patients with irregular ovulation or unexplained delay may benefit." },
      { question: "Is monitoring necessary each cycle?", answer: "Yes, to ensure optimal follicle development and timing." },
      { question: "How many cycles are recommended?", answer: "Typically 3-6 cycles before considering other options." },
    ],
    relatedSlugs: ["ovulation-disorders", "pcos-care", "intrauterine-insemination"],
  },
  {
    slug: "pcos-care",
    name: "Polycystic Ovary Syndrome (PCOS) Management",
    shortDescription: "Integrated hormonal, metabolic, and fertility-focused PCOS management.",
    category: "Focused Treatments",
    icon: "⚖️",
    overview:
      "PCOS is one of the most common hormonal disorders affecting women of reproductive age. Our comprehensive approach addresses both fertility and long-term health.",
    whatToExpect: [
      "Hormonal profiling and metabolic assessment",
      "Ultrasound evaluation of ovaries",
      "Insulin resistance screening",
      "Personalized lifestyle modification plan",
      "Fertility-focused treatment protocols",
    ],
    timeline: [
      { step: "Comprehensive Assessment", detail: "Hormonal tests, ultrasound, and metabolic evaluation" },
      { step: "Lifestyle Modification", detail: "3-6 months of diet and exercise intervention" },
      { step: "Medical Management", detail: "Medications to regulate cycles and induce ovulation" },
      { step: "Fertility Treatment", detail: "IUI or IVF if first-line treatments don't succeed" },
    ],
    faqs: [
      { question: "Can PCOS be cured?", answer: "PCOS cannot be cured but can be effectively managed with treatment." },
      { question: "Will I be able to conceive with PCOS?", answer: "Yes, most women with PCOS can conceive with appropriate treatment." },
      { question: "What lifestyle changes help PCOS?", answer: "Weight loss, regular exercise, and a low-glycemic diet significantly improve symptoms." },
    ],
    relatedSlugs: ["ovulation-disorders", "ovulation-induction-timed-intercourse", "gynecological-care"],
  },
  {
    slug: "endometriosis",
    name: "Endometriosis Diagnosis and Management",
    shortDescription: "Diagnosis and fertility-centered management of endometriosis.",
    category: "Focused Treatments",
    icon: "🧠",
    overview:
      "Endometriosis occurs when tissue similar to the uterine lining grows outside the uterus, causing pain and fertility challenges. We provide expert diagnosis and comprehensive treatment.",
    whatToExpect: [
      "Detailed symptom assessment",
      "Pelvic ultrasound and MRI if needed",
      "Laparoscopic diagnosis (gold standard)",
      "Pain management strategies",
      "Fertility preservation counseling",
    ],
    timeline: [
      { step: "Diagnosis", detail: "Clinical examination, imaging, and laparoscopy" },
      { step: "Medical Treatment", detail: "Hormonal therapy to suppress endometriosis" },
      { step: "Surgical Intervention", detail: "Laparoscopic removal if indicated" },
      { step: "Fertility Planning", detail: "IUI or IVF based on severity" },
    ],
    faqs: [
      { question: "How is endometriosis diagnosed?", answer: "Through symptoms, imaging, and confirmed by laparoscopy." },
      { question: "Does endometriosis always affect fertility?", answer: "Not always, but moderate to severe cases can impact fertility." },
      { question: "Can endometriosis come back after surgery?", answer: "Yes, recurrence is possible; ongoing management is important." },
    ],
    relatedSlugs: ["reproductive-surgery", "laparoscopy-hysteroscopy", "gynecological-care"],
  },
  {
    slug: "ovulation-disorders",
    name: "Ovulation Disorder Management",
    shortDescription: "Clinical management for irregular or absent ovulation.",
    category: "Focused Treatments",
    icon: "📉",
    overview:
      "Ovulation disorders are a leading cause of female infertility. We identify and treat various ovulatory dysfunctions to restore regular ovulation.",
    whatToExpect: [
      "Menstrual history and symptom evaluation",
      "Hormonal blood tests (FSH, LH, AMH, prolactin, thyroid)",
      "Ultrasound assessment of ovaries",
      "Ovulation tracking and confirmation",
      "Customized treatment protocols",
    ],
    timeline: [
      { step: "Evaluation", detail: "Hormonal tests and ovarian assessment" },
      { step: "Cause Identification", detail: "PCOS, hypothalamic, thyroid, or other causes" },
      { step: "Treatment Initiation", detail: "Medications or lifestyle changes" },
      { step: "Monitoring", detail: "Track ovulation response and adjust treatment" },
    ],
    faqs: [
      { question: "What causes ovulation disorders?", answer: "PCOS, hypothalamic dysfunction, premature ovarian insufficiency, thyroid issues, or hyperprolactinemia." },
      { question: "How do I know if I'm ovulating?", answer: "Regular periods, positive ovulation tests, and ultrasound monitoring confirm ovulation." },
      { question: "Can ovulation disorders be permanent?", answer: "Some causes are treatable; others may require ongoing management." },
    ],
    relatedSlugs: ["ovulation-induction-timed-intercourse", "pcos-care", "intrauterine-insemination"],
  },
  {
    slug: "decreased-amh",
    name: "Low Ovarian Reserve Management",
    shortDescription: "Specialized fertility planning for low ovarian reserve.",
    category: "Focused Treatments",
    icon: "🔬",
    overview:
      "Low AMH indicates reduced ovarian reserve, requiring timely and strategic fertility management to optimize conception chances.",
    whatToExpect: [
      "AMH testing and interpretation",
      "Antral follicle count via ultrasound",
      "Fertility preservation counseling",
      "Personalized treatment timeline",
      "Realistic expectation setting",
    ],
    timeline: [
      { step: "Assessment", detail: "AMH, FSH, and antral follicle count" },
      { step: "Counseling", detail: "Discuss options and timeframe urgency" },
      { step: "Fertility Treatment", detail: "Aggressive ovarian stimulation for IVF" },
      { step: "Alternative Planning", detail: "Donor eggs or adoption if needed" },
    ],
    faqs: [
      { question: "What is AMH and why does it matter?", answer: "AMH indicates the number of eggs remaining in the ovaries; low levels suggest limited time for conception." },
      { question: "Can low AMH be improved?", answer: "AMH levels cannot be increased, but egg quality can be optimized through lifestyle and supplements." },
      { question: "Should I freeze my eggs if my AMH is low?", answer: "Yes, egg freezing may be recommended to preserve current fertility potential." },
    ],
    relatedSlugs: ["ivf-assisted-reproduction", "fertility-preservation", "oncology-support"],
  },
  {
    slug: "tubal-blocks",
    name: "Tubal Blockage Diagnosis and Treatment",
    shortDescription: "Diagnosis and fertility options for blocked fallopian tubes.",
    category: "Focused Treatments",
    icon: "🧭",
    overview:
      "Blocked fallopian tubes prevent the egg and sperm from meeting, causing infertility. We offer advanced diagnostics and treatment solutions.",
    whatToExpect: [
      "HSG (Hysterosalpingography) for tubal assessment",
      "Laparoscopy for confirmation and treatment",
      "Evaluation of blockage location and severity",
      "Discussion of surgical vs. IVF options",
      "Personalized fertility planning",
    ],
    timeline: [
      { step: "Diagnosis", detail: "HSG or laparoscopy to confirm blockage" },
      { step: "Treatment Decision", detail: "Surgery vs. direct IVF" },
      { step: "Intervention", detail: "Surgical repair or IVF cycle" },
      { step: "Follow-up", detail: "Monitor for pregnancy or complications" },
    ],
    faqs: [
      { question: "What causes tubal blockage?", answer: "Previous infections, endometriosis, surgery, or pelvic inflammatory disease." },
      { question: "Can blocked tubes be opened?", answer: "Sometimes surgery helps, but IVF is often more effective." },
      { question: "Is IVF necessary for tubal blocks?", answer: "IVF bypasses the tubes and is often the most successful option." },
    ],
    relatedSlugs: ["reproductive-surgery", "laparoscopy-hysteroscopy", "ivf-assisted-reproduction"],
  },
  {
    slug: "uterine-polyps",
    name: "Uterine Polyp Evaluation and Removal",
    shortDescription: "Evaluation and removal of uterine polyps affecting fertility.",
    category: "Focused Treatments",
    icon: "🧫",
    overview:
      "Uterine polyps are growths in the uterine lining that can interfere with implantation and cause irregular bleeding. Removal often improves fertility outcomes.",
    whatToExpect: [
      "Transvaginal ultrasound detection",
      "Saline sonography for detailed assessment",
      "Hysteroscopic polypectomy (minimally invasive)",
      "Histopathological examination",
      "Post-removal fertility planning",
    ],
    timeline: [
      { step: "Detection", detail: "Ultrasound or saline sonography" },
      { step: "Hysteroscopy", detail: "Visual confirmation and removal" },
      { step: "Recovery", detail: "1-2 weeks healing period" },
      { step: "Fertility Treatment", detail: "Resume trying or start IVF/IUI" },
    ],
    faqs: [
      { question: "Do all polyps need to be removed?", answer: "Polyps larger than 1cm or causing symptoms should be removed, especially if trying to conceive." },
      { question: "Will polyps come back?", answer: "Recurrence is possible but not common." },
      { question: "When can I try to conceive after removal?", answer: "Usually after one normal menstrual cycle." },
    ],
    relatedSlugs: ["laparoscopy-hysteroscopy", "reproductive-surgery", "gynecological-care"],
  },
  {
    slug: "semen-abnormalities",
    name: "Semen Analysis and Treatment",
    shortDescription: "Clinical pathways for low count, motility, and morphology issues.",
    category: "Focused Treatments",
    icon: "🧪",
    overview:
      "Abnormal semen parameters are a common cause of male factor infertility. We provide comprehensive evaluation and treatment solutions.",
    whatToExpect: [
      "Detailed semen analysis (WHO criteria)",
      "Repeat testing to confirm abnormalities",
      "Advanced sperm function tests",
      "Hormonal and genetic evaluation if needed",
      "Treatment recommendations",
    ],
    timeline: [
      { step: "Semen Analysis", detail: "Initial and confirmatory tests" },
      { step: "Cause Investigation", detail: "Hormonal, genetic, or anatomical evaluation" },
      { step: "Treatment", detail: "Medical or surgical intervention" },
      { step: "Assisted Reproduction", detail: "IUI or IVF/ICSI if needed" },
    ],
    faqs: [
      { question: "What are normal semen parameters?", answer: "Count >15 million/ml, motility >40%, normal morphology >4%." },
      { question: "Can semen quality improve?", answer: "Yes, with treatment and lifestyle changes, improvement is often seen in 2-3 months." },
      { question: "What is ICSI?", answer: "A procedure where a single sperm is injected directly into an egg, used for severe male factor." },
    ],
    relatedSlugs: ["male-infertility", "intrauterine-insemination", "ivf-assisted-reproduction"],
  },
  {
    slug: "intrauterine-insemination",
    name: "Intrauterine Insemination (IUI)",
    shortDescription: "IUI cycles with monitored ovulation and timed insemination.",
    category: "Focused Treatments",
    icon: "💉",
    overview:
      "IUI is a fertility treatment where prepared sperm is placed directly into the uterus around the time of ovulation, increasing the chance of fertilization.",
    whatToExpect: [
      "Ovulation induction and monitoring",
      "Sperm preparation and washing",
      "Timed insemination procedure",
      "Luteal phase support",
      "Pregnancy test after 14 days",
    ],
    timeline: [
      { step: "Cycle Monitoring", detail: "Track follicle development via ultrasound" },
      { step: "Trigger Shot", detail: "HCG injection to time ovulation" },
      { step: "Insemination", detail: "Sperm placement 24-36 hours post-trigger" },
      { step: "Luteal Support", detail: "Progesterone supplementation" },
      { step: "Pregnancy Test", detail: "Blood test 14 days post-IUI" },
    ],
    faqs: [
      { question: "Who is a good candidate for IUI?", answer: "Couples with mild male factor, ovulation issues, or unexplained infertility." },
      { question: "How many IUI cycles should I try?", answer: "Typically 3-4 cycles before considering IVF." },
      { question: "What is the success rate of IUI?", answer: "10-20% per cycle, depending on age and underlying factors." },
    ],
    relatedSlugs: ["ovulation-induction-timed-intercourse", "male-infertility", "ivf-assisted-reproduction"],
  },
  {
    slug: "laparoscopy-hysteroscopy",
    name: "Minimally Invasive Reproductive Surgery",
    shortDescription: "Minimally invasive diagnostic and corrective reproductive procedures.",
    category: "Focused Treatments",
    icon: "🔎",
    overview:
      "Laparoscopy and hysteroscopy are minimally invasive surgical techniques used to diagnose and treat various reproductive conditions.",
    whatToExpect: [
      "Pre-operative evaluation and counseling",
      "Day-care surgical procedure",
      "Visual diagnosis and treatment in same session",
      "Quick recovery (2-7 days)",
      "Post-operative fertility planning",
    ],
    timeline: [
      { step: "Pre-operative Assessment", detail: "Tests and anesthesia clearance" },
      { step: "Procedure Day", detail: "30-90 minute surgery under general anesthesia" },
      { step: "Recovery", detail: "Same-day discharge or overnight observation" },
      { step: "Follow-up", detail: "1-2 weeks post-op check" },
      { step: "Fertility Planning", detail: "Resume treatment after healing" },
    ],
    faqs: [
      { question: "Is laparoscopy/hysteroscopy painful?", answer: "Minimal discomfort; most patients return to normal activities in 3-5 days." },
      { question: "What are the advantages over open surgery?", answer: "Smaller incisions, faster recovery, less scarring, and reduced infection risk." },
      { question: "When can I try to conceive after surgery?", answer: "Usually after 1-2 normal menstrual cycles, depending on the procedure." },
    ],
    relatedSlugs: ["reproductive-surgery", "endometriosis", "uterine-polyps"],
  },
];

export const coreServiceSlugs = [
  "ivf-assisted-reproduction",
  "gynecological-care",
  "fertility-preservation",
  "reproductive-surgery",
  "oncology-support",
  "counseling-support",
];

export const focusedServiceSlugs = services
  .filter((service) => !coreServiceSlugs.includes(service.slug))
  .map((service) => service.slug);

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function getServicesBySlugs(slugs: string[]): Service[] {
  return slugs.map((slug) => getServiceBySlug(slug)).filter((service): service is Service => Boolean(service));
}

