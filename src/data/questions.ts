export interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const questions: Record<'Tally' | 'Basic Computer' | 'Web Designing', Question[]> = {
  'Basic Computer': [
    // --- EASY (7 questions): IDs 1-7 ---
    {
      id: 1,
      question: "Which of the following is known as the 'Brain' of the computer system?",
      options: ["Control Unit", "Central Processing Unit (CPU)", "Arithmetic & Logic Unit", "Random Access Memory (RAM)"],
      answer: "Central Processing Unit (CPU)",
      difficulty: "easy"
    },
    {
      id: 2,
      question: "What is the shortcut key to copy a selected text or file in Windows?",
      options: ["Ctrl + P", "Ctrl + V", "Ctrl + C", "Ctrl + X"],
      answer: "Ctrl + C",
      difficulty: "easy"
    },
    {
      id: 3,
      question: "Which of the following computer memories is high-speed, volatile, and temporary?",
      options: ["RAM", "ROM", "Hard Disk Drive", "Solid State Drive"],
      answer: "RAM",
      difficulty: "easy"
    },
    {
      id: 4,
      question: "What does the abbreviation BIOS stand for?",
      options: ["Binary Input Output System", "Basic Input Output System", "Basic Industry Operations Software", "Buffer Input Output Service"],
      answer: "Basic Input Output System",
      difficulty: "easy"
    },
    {
      id: 5,
      question: "Which of the following is primarily an Input Device?",
      options: ["Monitor", "Printer", "Scanner", "Projector"],
      answer: "Scanner",
      difficulty: "easy"
    },
    {
      id: 6,
      question: "What is the shortcut key to undo the last action in Windows?",
      options: ["Ctrl + Y", "Ctrl + U", "Ctrl + Z", "Ctrl + Shift + Z"],
      answer: "Ctrl + Z",
      difficulty: "easy"
    },
    {
      id: 7,
      question: "Which key on a standard keyboard allows you to cancel or exit the current action?",
      options: ["Enter", "Shift", "Escape", "Spacebar"],
      answer: "Escape",
      difficulty: "easy"
    },
    // --- MEDIUM (7 questions): IDs 8-14 ---
    {
      id: 8,
      question: "Which part of the CPU is responsible for coordinating all actions and data flow?",
      options: ["Registers", "Control Unit (CU)", "Arithmetic Logic Unit (ALU)", "External Cache"],
      answer: "Control Unit (CU)",
      difficulty: "medium"
    },
    {
      id: 9,
      question: "In computer systems, exactly how many Kilobytes (KB) make up 1 Megabyte (MB)?",
      options: ["1000 KB", "1024 KB", "1048 KB", "1200 KB"],
      answer: "1024 KB",
      difficulty: "medium"
    },
    {
      id: 10,
      question: "Which protocol is utilized to securely transmit data across the internet?",
      options: ["HTTP", "FTP", "HTTPS", "SMTP"],
      answer: "HTTPS",
      difficulty: "medium"
    },
    {
      id: 11,
      question: "Which hardware component holds the initial startup code and is non-volatile?",
      options: ["RAM", "ROM", "GPU", "SSD cache"],
      answer: "ROM",
      difficulty: "medium"
    },
    {
      id: 12,
      question: "Which core software component directly manages file systems, external hardware, and active runs?",
      options: ["Compiler", "Desktop Environment", "Operating System Kernel", "Database System"],
      answer: "Operating System Kernel",
      difficulty: "medium"
    },
    {
      id: 13,
      question: "What is the shortcut to permanently delete files bypassing the Recycle Bin?",
      options: ["Delete", "Shift + Delete", "Ctrl + Delete", "Alt + Delete"],
      answer: "Shift + Delete",
      difficulty: "medium"
    },
    {
      id: 14,
      question: "What is the full form of PDF?",
      options: ["Print Document File", "Portable Document Format", "Personal Data Folder", "Pixel Definition Format"],
      answer: "Portable Document Format",
      difficulty: "medium"
    },
    // --- HARD (6 questions): IDs 15-20 ---
    {
      id: 15,
      question: "The clock speed of modern computer processors is fundamentally measured in which unit?",
      options: ["Kilohertz (kHz)", "Megabytes (MB)", "Megabits (Mbps)", "Gigahertz (GHz)"],
      answer: "Gigahertz (GHz)",
      difficulty: "hard"
    },
    {
      id: 16,
      question: "Which network topology features all nodes connected individually to a single central hub?",
      options: ["Ring Topology", "Star Topology", "Bus Topology", "Mesh Topology"],
      answer: "Star Topology",
      difficulty: "hard"
    },
    {
      id: 17,
      question: "A malicious self-replicating program that attaches itself to other files is called what?",
      options: ["Trojan Horse", "Spyware", "Adware", "Computer Virus"],
      answer: "Computer Virus",
      difficulty: "hard"
    },
    {
      id: 18,
      question: "What is the total bit-length of an IPv4 address?",
      options: ["16 bits", "32 bits", "64 bits", "128 bits"],
      answer: "32 bits",
      difficulty: "hard"
    },
    {
      id: 19,
      question: "Direct Memory Access (DMA) transactions bypass which major processing block?",
      options: ["system RAM", "the Network Interface", "the Central Processing Unit (CPU)", "Graphics processor VRAM"],
      answer: "the Central Processing Unit (CPU)",
      difficulty: "hard"
    },
    {
      id: 20,
      question: "Which utility reorganizes scattered file pieces on a storage drive to optimize speed?",
      options: ["Disk Defragmenter", "Registry Cleaner", "Disk Cleanup", "Memory Manager"],
      answer: "Disk Defragmenter",
      difficulty: "hard"
    }
  ],
  'Tally': [
    // --- EASY (7 questions): IDs 1-7 ---
    {
      id: 1,
      question: "What is the shortcut key to select or change Company in Tally ERP 9 / Prime?",
      options: ["Alt + F1", "F1", "F3", "Alt + F3"],
      answer: "F3",
      difficulty: "easy"
    },
    {
      id: 2,
      question: "Which voucher type is used for recording bank deposits, bank withdrawals, or bank-to-bank transfers?",
      options: ["Payment Voucher (F5)", "Receipt Voucher (F6)", "Journal Voucher (F7)", "Contra Voucher (F4)"],
      answer: "Contra Voucher (F4)",
      difficulty: "easy"
    },
    {
      id: 3,
      question: "What is the full form of GST?",
      options: ["General Sales Tax", "Government Service Tariff", "Goods and Services Tax", "Global Standard Tax"],
      answer: "Goods and Services Tax",
      difficulty: "easy"
    },
    {
      id: 4,
      question: "Which Tally shortcut key is used to create a ledger directly from inside a transaction voucher screen?",
      options: ["Alt + C", "Ctrl + C", "Alt + L", "Ctrl + L"],
      answer: "Alt + C",
      difficulty: "easy"
    },
    {
      id: 5,
      question: "What is the shortcut key to exit the Tally Gateway or close the application menu?",
      options: ["Ctrl + Q", "Alt + Q", "Esc + E", "Alt + X"],
      answer: "Ctrl + Q",
      difficulty: "easy"
    },
    {
      id: 6,
      question: "Which key is used to change the current financial period in Tally?",
      options: ["F2", "Alt + F2", "F1", "Alt + F1"],
      answer: "Alt + F2",
      difficulty: "easy"
    },
    {
      id: 7,
      question: "A structured ledger accounts summary statement compiled to test debit/credit equality is called what?",
      options: ["Balance Sheet", "Trial Balance", "Income Statement", "Cash Flow"],
      answer: "Trial Balance",
      difficulty: "easy"
    },
    // --- MEDIUM (7 questions): IDs 8-14 ---
    {
      id: 8,
      question: "Which transaction voucher type is leveraged to record credit sales of goods/inventory?",
      options: ["Sales Voucher (F8)", "Purchase Voucher (F9)", "Receipt Voucher (F6)", "Debit Note"],
      answer: "Sales Voucher (F8)",
      difficulty: "medium"
    },
    {
      id: 9,
      question: "Discount received from creditors belongs to which ledger group in Tally?",
      options: ["Direct Income", "Indirect Incomes", "Indirect Expenses", "Current Liabilities"],
      answer: "Indirect Incomes",
      difficulty: "medium"
    },
    {
      id: 10,
      question: "Salary payments made to employees must be categorized under which ledger group?",
      options: ["Direct Expenses", "Indirect Expenses", "Current Liabilities", "Capital Account"],
      answer: "Indirect Expenses",
      difficulty: "medium"
    },
    {
      id: 11,
      question: "Which shortcut function key is utilized to select the Payment voucher type?",
      options: ["F4", "F5", "F6", "F7"],
      answer: "F5",
      difficulty: "medium"
    },
    {
      id: 12,
      question: "Which shortcut function key is utilized to select the Receipt voucher type?",
      options: ["F5", "F6", "F7", "F8"],
      answer: "F6",
      difficulty: "medium"
    },
    {
      id: 13,
      question: "Which account type represents physical tangible assets, properties, or cash assets of a business?",
      options: ["Personal Account", "Real Account", "Nominal Account", "Representative Account"],
      answer: "Real Account",
      difficulty: "medium"
    },
    {
      id: 14,
      question: "An 'Outstanding Rent' ledger is semantically classified under which personal account subclass?",
      options: ["Natural Personal Account", "Artificial Personal Account", "Representative Personal Account", "Nominal Account"],
      answer: "Representative Personal Account",
      difficulty: "medium"
    },
    // --- HARD (6 questions): IDs 15-20 ---
    {
      id: 15,
      question: "Which menu sequence is taken to activate GST statutory capabilities in Tally?",
      options: ["F11 Features > F1 Inventory", "F11 Features > F3 Statutory & Taxation", "F12 Configuration > GST", "Gateway > Display > Statutory"],
      answer: "F11 Features > F3 Statutory & Taxation",
      difficulty: "hard"
    },
    {
      id: 16,
      question: "Which path tracks real-time cash inflows and outflows within Tally ERP?",
      options: ["Gateway > Display > Cash/Funds Flow", "Gateway > Trial Balance", "Gateway > Balance Sheet", "Gateway > Inventory Info"],
      answer: "Gateway > Display > Cash/Funds Flow",
      difficulty: "hard"
    },
    {
      id: 17,
      question: "What is the primary golden rule for a standard Real Account transaction?",
      options: ["Debit receiver, credit giver", "Debit what comes in, credit what goes out", "Debit all expenses, credit all gains", "Debit asset, credit liability"],
      answer: "Debit what comes in, credit what goes out",
      difficulty: "hard"
    },
    {
      id: 18,
      question: "To configure automated interest parameters on transactional balances, you must activate interest in:",
      options: ["F11 Features", "F12 Configure", "Ledger master only", "Voucher config"],
      answer: "F11 Features",
      difficulty: "hard"
    },
    {
      id: 19,
      question: "Personal Income Tax paid by a sole proprietor must be debited to which ledger master?",
      options: ["Capital Account", "Drawings Account", "Proprietor Salary", "Tax Payable"],
      answer: "Drawings Account",
      difficulty: "hard"
    },
    {
      id: 20,
      question: "Which two default system-generated ledger accounts cannot be fully deleted in Tally?",
      options: ["Cash & Profit & Loss A/c", "Bank & Cash Accounts", "Suspense & Cash Accounts", "Capital & Cash Accounts"],
      answer: "Cash & Profit & Loss A/c",
      difficulty: "hard"
    }
  ],
  'Web Designing': [
    // --- EASY (7 questions): IDs 1-7 ---
    {
      id: 1,
      question: "What does HTML stand for in modern web development standards?",
      options: ["HyperText Makeup Language", "HyperText Markup Language", "HighTransfer Machine Language", "Hyperlink Textual Markup Language"],
      answer: "HyperText Markup Language",
      difficulty: "easy"
    },
    {
      id: 2,
      question: "Which HTML tag is used to write internal CSS style definitions embedded in the page?",
      options: ["<css>", "<script>", "<style>", "<link>"],
      answer: "<style>",
      difficulty: "easy"
    },
    {
      id: 3,
      question: "What does CSS stand for in visual layout configurations?",
      options: ["Colorful Style Sheets", "Computer Style Sheets", "Creative Style Sheets", "Cascading Style Sheets"],
      answer: "Cascading Style Sheets",
      difficulty: "easy"
    },
    {
      id: 4,
      question: "Which CSS property is used to alter the background color of an element?",
      options: ["color", "background-color", "bgcolor", "fill-color"],
      answer: "background-color",
      difficulty: "easy"
    },
    {
      id: 5,
      question: "Inside which HTML element do we write custom client-side JavaScript code?",
      options: ["<js>", "<scripting>", "<script>", "<javascript>"],
      answer: "<script>",
      difficulty: "easy"
    },
    {
      id: 6,
      question: "Which correct HTML element creates a simple line break block?",
      options: ["<lb>", "<br>", "<break>", "<hr>"],
      answer: "<br>",
      difficulty: "easy"
    },
    {
      id: 7,
      question: "Which syntax accurately outlines an external anchor hyperlink reference in HTML?",
      options: ["<a href=\"url\">", "<a link=\"url\">", "<a>url</a>", "<hyperlink src=\"url\">"],
      answer: "<a href=\"url\">",
      difficulty: "easy"
    },
    // --- MEDIUM (7 questions): IDs 8-14 ---
    {
      id: 8,
      question: "Which CSS property governs the physical size of typography inside an element?",
      options: ["text-size", "font-style", "font-size", "text-style"],
      answer: "font-size",
      difficulty: "medium"
    },
    {
      id: 9,
      question: "What does DOM stand for in browser script interactions?",
      options: ["Document Object Model", "Data Object Management", "Digital Oriented Media", "Domain Overhead Module"],
      answer: "Document Object Model",
      difficulty: "medium"
    },
    {
      id: 10,
      question: "Which is the correct CSS declaration to center-align the text within an element block?",
      options: ["align: center", "text-align: center", "horizontal-align: center", "margin: auto"],
      answer: "text-align: center",
      difficulty: "medium"
    },
    {
      id: 11,
      question: "Which HTML element tag is leveraged to render a bulleted, unordered list?",
      options: ["<ol>", "<ul>", "<li>", "<list>"],
      answer: "<ul>",
      difficulty: "medium"
    },
    {
      id: 12,
      question: "Which CSS property is utilized to add whitespace layout room INSIDE the border of an element?",
      options: ["margin", "padding", "border-spacing", "content-indent"],
      answer: "padding",
      difficulty: "medium"
    },
    {
      id: 13,
      question: "Which semantic HTML5 element tag specifies a footer area for a tabular table configuration?",
      options: ["<tfoot>", "<foot>", "<table-foot>", "<tfoot></tfoot>"],
      answer: "<tfoot>",
      difficulty: "medium"
    },
    {
      id: 14,
      question: "Which utility global Javascript function parses a string parameter representation into a clean integer value?",
      options: ["toInteger()", "parseInt()", "Math.int()", "Number.parse()"],
      answer: "parseInt()",
      difficulty: "medium"
    },
    // --- HARD (6 questions): IDs 15-20 ---
    {
      id: 15,
      question: "According to the CSS Box Model layout order, the padding block is located directly between:",
      options: ["Margin and Border", "Content and Border", "Content and Margin", "Border and Outline"],
      answer: "Content and Border",
      difficulty: "hard"
    },
    {
      id: 16,
      question: "What is the correct syntax layout to define a native CSS custom variable?",
      options: ["$var-name: value;", "var-name: value;", "@variable name;", "--var-name: value;"],
      answer: "--var-name: value;",
      difficulty: "hard"
    },
    {
      id: 17,
      question: "Which event fires immediately when the standard HTML document is fully parsed without waiting for images or stylesheets?",
      options: ["load", "ParsedHTML", "DOMContentLoaded", "ready"],
      answer: "DOMContentLoaded",
      difficulty: "hard"
    },
    {
      id: 18,
      question: "Which CSS position value keeps an element anchored strictly relative to the browser window, surviving scrolls?",
      options: ["relative", "absolute", "static", "fixed"],
      answer: "fixed",
      difficulty: "hard"
    },
    {
      id: 19,
      question: "Which Javascript array prototype method returns the first element that satisfies a test execution?",
      options: ["filter()", "find()", "first()", "search()"],
      answer: "find()",
      difficulty: "hard"
    },
    {
      id: 20,
      question: "What semantically correct HTML5 section tag is designed to package peripheral supporting, secondary side sections of content?",
      options: ["<section>", "<aside>", "<sidebar>", "<details>"],
      answer: "<aside>",
      difficulty: "hard"
    }
  ]
};
