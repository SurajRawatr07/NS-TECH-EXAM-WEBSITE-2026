export interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

export const questions: Record<'Tally' | 'Basic Computer' | 'Web Designing', Question[]> = {
  'Basic Computer': [
    {
      id: 1,
      question: "Which of the following is known as the 'Brain' of the computer system?",
      options: ["Control Unit", "Central Processing Unit (CPU)", "Arithmetic & Logic Unit", "Random Access Memory (RAM)"],
      answer: "Central Processing Unit (CPU)"
    },
    {
      id: 2,
      question: "What is the shortcut key to copy a selected text or file?",
      options: ["Ctrl + P", "Ctrl + V", "Ctrl + C", "Ctrl + X"],
      answer: "Ctrl + C"
    },
    {
      id: 3,
      question: "Which of the following computer memories is high-speed, volatile, and temporary?",
      options: ["RAM", "ROM", "Hard Disk Drive", "Solid State Drive"],
      answer: "RAM"
    },
    {
      id: 4,
      question: "What does the abbreviation BIOS stand for?",
      options: ["Binary Input Output System", "Basic Input Output System", "Basic Industry Operations Software", "Buffer Input Output Service"],
      answer: "Basic Input Output System"
    },
    {
      id: 5,
      question: "Which of the following is primarily an Input Device?",
      options: ["Monitor", "Printer", "Scanner", "Projector"],
      answer: "Scanner"
    },
    {
      id: 6,
      question: "In computer terminology, 1 Megabyte (MB) is equal to how many Kilobytes (KB)?",
      options: ["1000 KB", "1024 KB", "1048 KB", "1100 KB"],
      answer: "1024 KB"
    },
    {
      id: 7,
      question: "What is the shortcut key to undo the last action in Windows?",
      options: ["Ctrl + Y", "Ctrl + U", "Ctrl + Z", "Ctrl + Shift + Z"],
      answer: "Ctrl + Z"
    },
    {
      id: 8,
      question: "What is the full form of PDF?",
      options: ["Print Document File", "Portable Document Format", "Personal Data Folder", "Pixel Definition Format"],
      answer: "Portable Document Format"
    },
    {
      id: 9,
      question: "Which of the following is the main operating system developed and distributed by Microsoft?",
      options: ["macOS", "Linux", "Windows", "Unix"],
      answer: "Windows"
    },
    {
      id: 10,
      question: "Which key on a standard keyboard allows you to cancel or exit the current action or dialog box?",
      options: ["Enter", "Shift", "Escape", "Spacebar"],
      answer: "Escape"
    }
  ],
  'Tally': [
    {
      id: 1,
      question: "What is the shortcut key to select a Company in Tally ERP 9 / Prime?",
      options: ["Alt + F1", "F1", "F3", "Alt + F3"],
      answer: "F3"
    },
    {
      id: 2,
      question: "Which voucher type is used for recording money transfers between bank accounts or cash withdrawals/deposits?",
      options: ["Payment Voucher (F5)", "Receipt Voucher (F6)", "Journal Voucher (F7)", "Contra Voucher (F4)"],
      answer: "Contra Voucher (F4)"
    },
    {
      id: 3,
      question: "What is the full form of GST?",
      options: ["General Sales Tax", "Government Service Tariff", "Goods and Services Tax", "Global Standard Tax"],
      answer: "Goods and Services Tax"
    },
    {
      id: 4,
      question: "Which Tally shortcut key is used to create a ledger directly from a transaction voucher screen?",
      options: ["Alt + C", "Ctrl + C", "Alt + L", "Ctrl + L"],
      answer: "Alt + C"
    },
    {
      id: 5,
      question: "Where do you find the 'Group Summary' or 'Balance Sheet' option in Tally?",
      options: ["Gateway of Tally", "Display Menu", "Accounts Info Menu", "Voucher Entry Screen"],
      answer: "Gateway of Tally"
    },
    {
      id: 6,
      question: "Which book is used to record all daily cash receipts and cash payments?",
      options: ["Sales Book", "Purchase Book", "Cash Book", "Journal Book"],
      answer: "Cash Book"
    },
    {
      id: 7,
      question: "What is the shortcut key to exit Tally Gateway or close the application?",
      options: ["Ctrl + Q", "Alt + Q", "Esc + E", "Alt + X"],
      answer: "Ctrl + Q"
    },
    {
      id: 8,
      question: "Which type of account represents assets, properties, or possessions of a business?",
      options: ["Personal Account", "Real Account", "Nominal Account", "Representative Account"],
      answer: "Real Account"
    },
    {
      id: 9,
      question: "A Trial Balance is fundamentally classified as which of the following?",
      options: ["An Account", "A Ledger", "A Statement", "A Subsidiary Book"],
      answer: "A Statement"
    },
    {
      id: 10,
      question: "Which key is used to change the current financial period in Tally?",
      options: ["F2", "Alt + F2", "F1", "Alt + F1"],
      answer: "Alt + F2"
    }
  ],
  'Web Designing': [
    {
      id: 1,
      question: "What does HTML stand for in web development?",
      options: ["HyperText Makeup Language", "HyperText Markup Language", "HighTransfer Machine Language", "Hyperlink Textual Markup Language"],
      answer: "HyperText Markup Language"
    },
    {
      id: 2,
      question: "Which HTML tag is used to write or link internal CSS style definitions?",
      options: ["<css>", "<script>", "<style>", "<link>"],
      answer: "<style>"
    },
    {
      id: 3,
      question: "What does CSS stand for?",
      options: ["Colorful Style Sheets", "Computer Style Sheets", "Creative Style Sheets", "Cascading Style Sheets"],
      answer: "Cascading Style Sheets"
    },
    {
      id: 4,
      question: "Which CSS property is used to change the background color of an element?",
      options: ["color", "background-color", "bgcolor", "fill-color"],
      answer: "background-color"
    },
    {
      id: 5,
      question: "Inside which HTML element do we write custom client-side JavaScript code?",
      options: ["<js>", "<scripting>", "<script>", "<javascript>"],
      answer: "<script>"
    },
    {
      id: 6,
      question: "Which is the correct HTML element for creating a line break?",
      options: ["<lb>", "<br>", "<break>", "<hr>"],
      answer: "<br>"
    },
    {
      id: 7,
      question: "How do you render a hyperlink in HTML to link to an external address?",
      options: ["<a href=\"url\">", "<a link=\"url\">", "<a>url</a>", "<hyperlink src=\"url\">"],
      answer: "<a href=\"url\">"
    },
    {
      id: 8,
      question: "Which CSS property controls the text size of an element?",
      options: ["text-size", "font-style", "font-size", "text-style"],
      answer: "font-size"
    },
    {
      id: 9,
      question: "What does DOM stand for in modern web development frameworks?",
      options: ["Document Object Model", "Data Object Management", "Digital Oriented Media", "Domain Overhead Module"],
      answer: "Document Object Model"
    },
    {
      id: 10,
      question: "Which of the following is the correct CSS declaration to center-align the text within an element?",
      options: ["align: center", "text-align: center", "horizontal-align: center", "margin: auto"],
      answer: "text-align: center"
    }
  ]
};
