export type Track = {
  id: string;
  name: string;
  code: string;
  level: string;
  color: string;
};

export type Session = {
  id: string;
  trackId: string;
  day: 1 | 2;
  time: string;
  title: string;
  description: string;
};

export const tracks: Track[] = [
  {
    id: "business",
    name: "Business Track",
    code: "WAS16.14.200",
    level: "",
    color: "orange",
  },
  {
    id: "tech1",
    name: "Technical Track 1",
    code: "WAS16.13.200",
    level: "L100–L200",
    color: "blue",
  },
  {
    id: "tech1-d2",
    name: "Technical Track 1",
    code: "WAS16.13.200",
    level: "L300–L400",
    color: "blue",
  },
  {
    id: "tech2",
    name: "Technical Track 2",
    code: "WAS16.13.101",
    level: "L200–L300",
    color: "teal",
  },
  {
    id: "tech2-d2",
    name: "Technical Track 2",
    code: "WAS16.13.101",
    level: "L300–L400",
    color: "teal",
  },
];

export const sessions: Session[] = [
  // ── DAY 1 ── BUSINESS TRACK ──────────────────────────────────────────────
  {
    id: "d1-b1",
    trackId: "business",
    day: 1,
    time: "10:15 – 11:15",
    title: "The Mainframe Modernization Imperative",
    description:
      "Explore why modernization has become urgent and how AWS addresses the challenge with comprehensive solutions spanning replatforming to complete reimagination. Learn about market drivers, AWS GTM strategy for enterprise mainframe workloads, and funding programs that reduce financial risk and accelerate customer decisions.",
  },
  {
    id: "d1-b2",
    trackId: "business",
    day: 1,
    time: "11:15 – 12:15",
    title: "AWS Voice of Customers",
    description:
      "AWS geographic sales leaders share unfiltered insights from real customer conversations. Discover which industries are moving fastest, what objections surface most often, and which value propositions are winning deals. Gain market intelligence to sharpen your sales approach.",
  },
  {
    id: "d1-b3",
    trackId: "business",
    day: 1,
    time: "1:00 – 2:00",
    title: "Beyond COBOL Conversion: AWS Transform",
    description:
      "Explore how the AWS Transform reimagine pattern, powered by agentic AI, attracts new talent pools, excites developer teams, and gives business leaders the opportunity to use modernization as a catalyst for competitive advantage. Includes customer story and demo.",
  },
  {
    id: "d1-b4",
    trackId: "business",
    day: 1,
    time: "2:00 – 3:00",
    title: "Winning Together: The Co-Selling Playbook",
    description:
      "Learn how to navigate the AWS engagement landscape — account managers, solution architects, specialists, and funding programs. Includes IBM's point of view on AWS engagement and a practical framework from discovery to closure.",
  },
  {
    id: "d1-b5",
    trackId: "business",
    day: 1,
    time: "3:00 – 4:00",
    title: "Composable Solutions: Faster Time-to-Value",
    description:
      "Discover how AWS Transform's composability framework enables seamless integration of best-of-breed partner solutions. Featuring real-world examples from Western Union, Unum/Pega ($6M ARR, 7,000 hours saved), and Guardian/Deloitte deployments.",
  },
  {
    id: "d1-b6",
    trackId: "business",
    day: 1,
    time: "4:00 – 5:00",
    title: "Scaling Revenue with AWS ProServe",
    description:
      "Explore engagement models with AWS Professional Services: ProServe as Prime, as Sub, and Side by Side. Data shows co-selling with ProServe delivers 47.9% win rates and deal sizes 4x larger compared to working independently.",
  },

  // ── DAY 1 ── TECHNICAL TRACK 1 ──────────────────────────────────────────
  {
    id: "d1-t1-1",
    trackId: "tech1",
    day: 1,
    time: "10:15 – 11:15",
    title: "Building Winning Practices with AWS",
    description:
      "Get equipped with the complete AWS support ecosystem: dedicated teams, latest innovations including Agentic AI-powered transformation tools, proven methodologies, sizing methodologies for target architectures, effort estimation, and AWS running cost calculations.",
  },
  {
    id: "d1-t1-2",
    trackId: "tech1",
    day: 1,
    time: "11:15 – 12:15",
    title: "Right Pattern, Right Tool: Decision Framework",
    description:
      "Master when to apply top-down vs. bottom-up analysis, pattern selection based on application characteristics, and tool landscape navigation including AWS Transform's Agentic AI. Build a rationalized modernization roadmap for your entire portfolio.",
  },
  {
    id: "d1-t1-3",
    trackId: "tech1",
    day: 1,
    time: "1:00 – 2:00",
    title: "The Composability Advantage: Custom Agents",
    description:
      "Learn how to extend AWS Transform with custom agents via MCP servers. Build intelligent agents that handle company-specific code patterns, automate custom refactoring rules, and implement specialized transformation steps within a unified platform.",
  },
  {
    id: "d1-t1-4",
    trackId: "tech1",
    day: 1,
    time: "2:00 – 3:00",
    title: "From Data Gravity to Data Intelligence",
    description:
      "Discover how to liberate mainframe data (VSAM, DB2, IMS) for modern applications and AI/ML. Learn how SMF records reveal which code is actually running and where quick wins deliver maximum ROI. Teams discovered 30% of codebases were never executed.",
  },
  {
    id: "d1-t1-5",
    trackId: "tech1",
    day: 1,
    time: "3:00 – 4:00",
    title: "The Validation Challenge",
    description:
      "Discover how AWS Transform Testing uses Agentic AI to automatically generate comprehensive test cases, perform output comparison at scale, and automate regression testing — reducing validation time from months to weeks.",
  },

  // ── DAY 1 ── TECHNICAL TRACK 2 ──────────────────────────────────────────
  {
    id: "d1-t2-1",
    trackId: "tech2",
    day: 1,
    time: "10:15 – 11:15",
    title: "AI-Powered Domain Decomposition",
    description:
      'Learn how AWS Transform\'s Agentic AI visualizes hidden relationships and dependencies across millions of lines of code. Discover natural domain boundaries — teams found their "single application" was actually 5 distinct business domains.',
  },
  {
    id: "d1-t2-2",
    trackId: "tech2",
    day: 1,
    time: "11:15 – 12:15",
    title: "Agentic AI-Powered Incremental Transformation",
    description:
      "See how the Strangler Pattern with Agentic AI enables incremental reimagination — transforming COBOL into cloud-native microservices while maintaining business continuity. Includes composable solutions with partner agents.",
  },
  {
    id: "d1-t2-3",
    trackId: "tech2",
    day: 1,
    time: "1:30 – 5:00",
    title: "Hands-On Workshops",
    description:
      "Three parallel labs: Mainframe to Microservices with AWS Transform & AI Agents • COBOL to Cloud accelerated refactoring • From VSAM to DynamoDB reimagining mainframe data for the cloud.",
  },

  // ── DAY 2 ── BUSINESS TRACK ──────────────────────────────────────────────
  {
    id: "d2-b1",
    trackId: "business",
    day: 2,
    time: "10:15 – 11:00",
    title: "AWS Funding That Accelerates Deals",
    description:
      "In-depth look at Migration Acceleration Program for Mainframe, Strategic Collaboration Agreements, and how these differ from standard programs. Learn how to structure deals that reduce customer risk and turn long sales cycles into faster wins.",
  },
  {
    id: "d2-b2",
    trackId: "business",
    day: 2,
    time: "11:15 – 12:15",
    title: "Building Modernization Muscle: EBA",
    description:
      "Experience-Based Acceleration is a hands-on methodology that quickly builds working pilots for customers. Learn how the complimentary Mainframe EBA program builds customer capability while delivering real modernization results through agile, immersive engagements.",
  },
  {
    id: "d2-b3",
    trackId: "business",
    day: 2,
    time: "1:00 – 2:00",
    title: "AWS Mainframe Modernization Competency",
    description:
      "Understand the Services and Technology competency tracks, updated requirements making it easier to apply, benefits of achieving competency status, and the validation process. Competency differentiates partners and opens doors to larger opportunities.",
  },
  {
    id: "d2-b4",
    trackId: "business",
    day: 2,
    time: "2:00 – 3:00",
    title: "Leveraging AWS ISV Partner Solutions",
    description:
      "Explore with OpenLegacy how to integrate validated technology solutions across data mobility, application testing, integration, discovery, monitoring, and infrastructure automation. Build a complete modernization practice with best-of-breed capabilities.",
  },

  // ── DAY 2 ── TECHNICAL TRACK 1 ──────────────────────────────────────────
  {
    id: "d2-t1-1",
    trackId: "tech1-d2",
    day: 2,
    time: "10:15 – 11:15",
    title: "Refactor at Scale: AI-Powered COBOL Transformation",
    description:
      "See how AWS Transform's specialized AI agents analyze COBOL programs, extract embedded business rules and tribal knowledge, and generate well-structured, maintainable Java code optimized for cloud-native architectures. This is intelligent refactoring, not line-by-line translation.",
  },
  {
    id: "d2-t1-2",
    trackId: "tech1-d2",
    day: 2,
    time: "11:15 – 12:15",
    title: "Auto-Generated APIs for Hybrid Architectures",
    description:
      "Learn how AWS Transform identifies integration boundaries using dependency analysis, then leverages OpenLegacy to automatically generate APIs bridging mainframe programs and modern microservices. Deploy hybrid architectures using the Strangler Pattern without business disruption.",
  },
  {
    id: "d2-t1-3",
    trackId: "tech1-d2",
    day: 2,
    time: "1:00 – 2:00",
    title: "COBOL to Agile Workflows: AWS Transform + Pega",
    description:
      "See how AWS Transform analyzes mainframe code to extract business rules, then seamlessly transforms rigid COBOL workflows into flexible, business-user-manageable processes in Pega's low-code/no-code cloud platform. Empower business users to modify processes without code changes.",
  },
  {
    id: "d2-t1-4",
    trackId: "tech1-d2",
    day: 2,
    time: "2:00 – 3:00",
    title: "Build a Mainframe Super Agent",
    description:
      "Learn how to create a Mainframe Super Agent using Amazon QuickSight and Kiro that combines Transform outputs, customer documentation, naming conventions, and project standards into one intelligent assistant. Get instant answers about legacy systems and intelligent cloud architecture guidance.",
  },

  // ── DAY 2 ── TECHNICAL TRACK 2 ──────────────────────────────────────────
  {
    id: "d2-t2-1",
    trackId: "tech2-d2",
    day: 2,
    time: "10:00 AM – 3:00 PM",
    title: "Hands-On Workshops (Full Day)",
    description:
      "Three parallel hands-on labs with lunch break at 12:15. Mainframe to Microservices: Reimagine with AWS Transform & AI Agents — decompose monolithic applications into cloud-native microservices using agentic AI. COBOL to Cloud: Accelerated refactoring with AWS Transform agentic AI — transform COBOL code into modern Java with intelligent refactoring. From VSAM to DynamoDB: Reimagining mainframe data for the cloud — migrate and modernize mainframe data stores using AI-powered transformation.",
  },
];
