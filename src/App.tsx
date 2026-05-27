/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Calendar, 
  BookOpen, 
  ChevronRight, 
  ChevronLeft, 
  Clock, 
  CheckCircle2, 
  Award, 
  Download, 
  RefreshCw,
  Trophy,
  AlertCircle,
  BarChart3,
  Target,
  Timer,
  Hash,
  Check,
  X,
  Volume2,
  VolumeX,
  Instagram,
  Linkedin,
  ShieldAlert,
  Maximize,
  Minimize,
  AlertTriangle,
  Eye,
  EyeOff,
  RotateCcw,
  Smartphone,
  Lock,
  MessageSquare,
  Search,
  Cpu,
  ShieldCheck,
  Zap,
  Flame,
  AwardIcon,
  Github,
  QrCode,
  Sparkles,
  ExternalLink,
  ChevronDown,
  Home
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { questions, Question } from './data/questions';

// Bypasses browser autoplay restrictions using programmatic high-fidelity sine oscillators
class SyntheticSoundService {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private initCtx() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playClick() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(900, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {}
  }

  playTick() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1500, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.02, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.02);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.02);
    } catch {}
  }

  playAlert() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      [0, 0.15].forEach(delay => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(380, t + delay);
        osc.frequency.linearRampToValueAtTime(150, t + delay + 0.12);
        gain.gain.setValueAtTime(0.06, t + delay);
        gain.gain.exponentialRampToValueAtTime(0.001, t + delay + 0.12);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t + delay);
        osc.stop(t + delay + 0.12);
      });
    } catch {}
  }

  playSuccess() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 major chord arpeggio
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.04, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.28);
      });
    } catch {}
  }

  playSwell() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc1.type = 'sine';
      osc2.type = 'triangle';
      osc1.frequency.setValueAtTime(220, now);
      osc1.frequency.exponentialRampToValueAtTime(880, now + 1.0);
      osc2.frequency.setValueAtTime(221.5, now);
      osc2.frequency.exponentialRampToValueAtTime(882.5, now + 1.0);
      gain.gain.setValueAtTime(0.015, now);
      gain.gain.linearRampToValueAtTime(0.06, now + 0.7);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.0);
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);
      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 1.0);
      osc2.stop(now + 1.0);
    } catch {}
  }

  playHeartbeat() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      // Dub-dub heartbeat sound: first beat (low)
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(55, now);
      osc1.frequency.exponentialRampToValueAtTime(10, now + 0.15);
      gain1.gain.setValueAtTime(0.25, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.15);

      // Second beat (slightly higher pitch) after 0.22 seconds
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(58, now + 0.22);
      osc2.frequency.exponentialRampToValueAtTime(10, now + 0.22 + 0.18);
      gain2.gain.setValueAtTime(0.22, now + 0.22);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.22 + 0.18);
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(now + 0.22);
      osc2.stop(now + 0.22 + 0.18);
    } catch {}
  }
}

const synthSvc = new SyntheticSoundService();

type Tab = 'home' | 'exam' | 'faq';
type ExamStep = 'gate' | 'quiz' | 'review' | 'scanning' | 'result' | 'certificate';

interface UserData {
  name: string;
  date: string;
  course: 'Basic Computer' | 'Tally' | 'Web Designing';
  password?: string;
}

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'info' | 'warning';
}

const MOTIVATIONAL_HUD_PROMPTS = [
  "Focus Mode Activated ⚡",
  "Great Progress! Stay Calm 🚀",
  "Keep Going! Success is Near 🔥",
  "Secure Link Fully Encrypted 🔒",
  "You're Doing Incredible!",
  "Analytical Process Stable 🧠",
  "Maintain Full Concentration 🎯"
];

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [examStep, setExamStep] = useState<ExamStep>('gate');
  const [isLoaderBooting, setIsLoaderBooting] = useState(true);
  const [bootProgress, setBootProgress] = useState(0);
  const [bootStatusText, setBootStatusText] = useState('VERIFYING COGNITIVE MODULES...');
  
  const [userData, setUserData] = useState<UserData>({
    name: '',
    date: new Date().toISOString().split('T')[0],
    course: 'Basic Computer',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [questionTimeLeft, setQuestionTimeLeft] = useState(60);
  const [totalTimeTaken, setTotalTimeTaken] = useState(0);
  const [score, setScore] = useState(0);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [soundToggle, setSoundToggle] = useState(true);
  const [certificateId] = useState(`NST-2026-${Math.random().toString(36).substring(2, 6).toUpperCase()}`);
  
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showViolationModal, setShowViolationModal] = useState(false);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [warnings, setWarnings] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const [isDrumrollActive, setIsDrumrollActive] = useState(false);
  
  const [isResumingExam, setIsResumingExam] = useState(false);
  const [isPortrait, setIsPortrait] = useState(true);
  const [randomizedQuestionsList, setRandomizedQuestionsList] = useState<Question[]>([]);
  const [antiCheatFlashActive, setAntiCheatFlashActive] = useState(false);
  
  // Scanning sequence variables
  const [scanningProgress, setScanningProgress] = useState(0);
  const [scanningStatus, setScanningStatus] = useState('DECRYPTING TRANSACTIONS...');
  
  // UI coordinates for holographic background glow
  const [mouseCoord, setMouseCoord] = useState({ x: 0, y: 0 });
  const [scrolledNavVisible, setScrolledNavVisible] = useState(true);
  const lastScrollY = useRef(0);

  const [typingText, setTypingText] = useState("");
  const [typingPhraseIndex, setTypingPhraseIndex] = useState(0);

  const phrases = useMemo(() => [
    "Secure Online Assessments 🔒",
    "Advanced Real-Time Analytics 🧠",
    "Shielded Anti-Cheat Monitoring 🛡️",
    "Immersive Educational Journeys 🚀"
  ], []);

  useEffect(() => {
    let activePhrase = phrases[typingPhraseIndex];
    let charIndex = 0;
    let isDeleting = false;
    let timer: any;

    const tick = () => {
      if (!isDeleting) {
        setTypingText(activePhrase.substring(0, charIndex + 1));
        charIndex++;
        if (charIndex === activePhrase.length) {
          isDeleting = true;
          timer = setTimeout(tick, 2000);
        } else {
          timer = setTimeout(tick, 60);
        }
      } else {
        setTypingText(activePhrase.substring(0, charIndex - 1));
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          setTypingPhraseIndex(prev => (prev + 1) % phrases.length);
          timer = setTimeout(tick, 500);
        } else {
          timer = setTimeout(tick, 40);
        }
      }
    };

    timer = setTimeout(tick, 500);
    return () => clearTimeout(timer);
  }, [typingPhraseIndex, phrases]);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const totalTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Motivational Prompts Tracker
  const hudPrompt = useMemo(() => {
    return MOTIVATIONAL_HUD_PROMPTS[currentQuestionIndex % MOTIVATIONAL_HUD_PROMPTS.length];
  }, [currentQuestionIndex]);

  // Handle document level mouse track for glowing highlight
  useEffect(() => {
    const handleCoord = (e: MouseEvent) => {
      setMouseCoord({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleCoord);
    return () => window.removeEventListener('mousemove', handleCoord);
  }, []);

  // Hide or Show bottom floating navigation on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY.current && currentY > 80) {
        setScrolledNavVisible(false);
      } else {
        setScrolledNavVisible(true);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dynamic Questions selection conforming to current selected track
  const currentExamQuestions = useMemo(() => {
    return randomizedQuestionsList.length > 0 ? randomizedQuestionsList : questions[userData.course];
  }, [randomizedQuestionsList, userData.course]);

  // Interactive Question Shuffle based on Difficulty and sequence
  const generateRandomShuffledSyllabus = (trackName: keyof typeof questions) => {
    const allQuestions = [...questions[trackName]];
    
    // Classify by difficulty status
    const easyQs = allQuestions.filter(q => q.difficulty === 'easy');
    const mediumQs = allQuestions.filter(q => q.difficulty === 'medium');
    const hardQs = allQuestions.filter(q => q.difficulty === 'hard');
    
    // Standard random shuffler
    const shuffleArray = <T,>(arr: T[]): T[] => {
      const shuffled = [...arr];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };
    
    // Shuffle each block individually
    const shuffledEasy = shuffleArray(easyQs);
    const shuffledMedium = shuffleArray(mediumQs);
    const shuffledHard = shuffleArray(hardQs);
    
    // Assemble smooth progression sequence: Easy (7) -> Medium (7) -> Hard (6)
    const combinedList = [...shuffledEasy, ...shuffledMedium, ...shuffledHard];
    
    // Shuffle options inside each question
    const finishedList = combinedList.map(item => {
      const optionsShuffled = [...item.options];
      for (let x = optionsShuffled.length - 1; x > 0; x--) {
        const y = Math.floor(Math.random() * (x + 1));
        [optionsShuffled[x], optionsShuffled[y]] = [optionsShuffled[y], optionsShuffled[x]];
      }
      return {
        ...item,
        options: optionsShuffled
      };
    });
    setRandomizedQuestionsList(finishedList);
  };

  // Sound toggle sync with Synthetic Service wrapper
  useEffect(() => {
    synthSvc.enabled = soundToggle;
  }, [soundToggle]);

  // Loading portal cinematic animation bootseq
  useEffect(() => {
    if (isLoaderBooting) {
      const intervalSec = 100;
      let durationLoaded = 0;
      const interval = setInterval(() => {
        durationLoaded += Math.floor(Math.random() * 3) + 2;
        if (durationLoaded >= 100) {
          durationLoaded = 100;
          clearInterval(interval);
          setTimeout(() => {
            setIsLoaderBooting(false);
          }, 300);
        }
        setBootProgress(durationLoaded);
        
        if (durationLoaded < 25) {
          setBootStatusText('Initializing Secure Environment...');
        } else if (durationLoaded < 50) {
          setBootStatusText('Loading AI Modules...');
        } else if (durationLoaded < 75) {
          setBootStatusText('Verifying System Integrity...');
        } else {
          setBootStatusText('Access Granted');
        }
      }, intervalSec);
      
      return () => clearInterval(interval);
    }
  }, [isLoaderBooting]);

  // Session Intercept warnings
  useEffect(() => {
    const blockTabSwitches = () => {
      if (document.hidden && activeTab === 'exam' && examStep === 'quiz') {
        const nextWarn = warnings + 1;
        setWarnings(nextWarn);
        synthSvc.playAlert();
        if (nextWarn >= 3) {
          handleForceSubmit();
          setShowViolationModal(false);
          triggerInstantToast('Exam auto-submitted by Smart Monitor due to excessive deviations', 'warning');
        } else {
          setShowViolationModal(true);
        }
      }
    };
    document.addEventListener('visibilitychange', blockTabSwitches);
    return () => document.removeEventListener('visibilitychange', blockTabSwitches);
  }, [activeTab, examStep, warnings]);

  // Mouse screen bounds check proctoring chimes
  useEffect(() => {
    const handleBoundsGuard = () => {
      if (activeTab === 'exam' && examStep === 'quiz') {
        synthSvc.playAlert();
        triggerInstantToast("Security Alert: Refocus gaze inside the portal region", "warning");
      }
    };
    window.addEventListener('mouseleave', handleBoundsGuard);
    return () => window.removeEventListener('mouseleave', handleBoundsGuard);
  }, [activeTab, examStep]);

  // Block Developer Tools shortcuts
  useEffect(() => {
    const blockDevInput = (e: KeyboardEvent) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) ||
        (e.ctrlKey && (e.key === 'U' || e.key === 'u' || e.key === 'S' || e.key === 's'))
      ) {
        e.preventDefault();
        synthSvc.playAlert();
        setAntiCheatFlashActive(true);
        setTimeout(() => setAntiCheatFlashActive(false), 300);
        triggerInstantToast("Holographic Firewall: Shortcut patterns restricted!", "warning");
      }
    };
    window.addEventListener('keydown', blockDevInput);
    return () => window.removeEventListener('keydown', blockDevInput);
  }, []);

  // Block print selection/right-clicks
  useEffect(() => {
    const cancelEv = (e: Event) => e.preventDefault();
    document.addEventListener('contextmenu', cancelEv);
    document.addEventListener('copy', cancelEv);
    document.addEventListener('selectstart', cancelEv);
    return () => {
      document.removeEventListener('contextmenu', cancelEv);
      document.removeEventListener('copy', cancelEv);
      document.removeEventListener('selectstart', cancelEv);
    };
  }, []);

  // Orientation Check
  useEffect(() => {
    const updateRotationView = () => {
      setIsPortrait(window.innerHeight >= window.innerWidth || window.innerWidth > 1024);
    };
    window.addEventListener('resize', updateRotationView);
    updateRotationView();
    return () => window.removeEventListener('resize', updateRotationView);
  }, []);

  // Manage Toast systems
  const triggerInstantToast = (message: string, type: 'success' | 'info' | 'warning' = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev.slice(-3), { id, message, type }]);
  };

  useEffect(() => {
    if (toasts.length > 0) {
      const targetToast = toasts[toasts.length - 1];
      const timer = setTimeout(() => {
        setToasts(prev => prev.filter(item => item.id !== targetToast.id));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toasts]);

  // Check storage session restore
  useEffect(() => {
    const cachedObject = localStorage.getItem('nst_assessment_key_v2');
    if (cachedObject) {
      const payload = JSON.parse(cachedObject);
      if (payload.activeTab === 'exam' && payload.examStep === 'quiz') {
        setIsResumingExam(true);
      }
    }
  }, []);

  const initRestoredSession = () => {
    const cachedObject = localStorage.getItem('nst_assessment_key_v2');
    if (cachedObject) {
      const { userData: restoredUser, answers: restoredAnswers, currentQuestionIndex: restoredIndex, randomizedQuestionsList: restoredQ } = JSON.parse(cachedObject);
      setUserData(restoredUser);
      setAnswers(restoredAnswers);
      setCurrentQuestionIndex(restoredIndex);
      setRandomizedQuestionsList(restoredQ);
      setActiveTab('exam');
      setExamStep('quiz');
      setIsResumingExam(false);
      synthSvc.playSuccess();
      triggerInstantToast("Secure session package re-established successfully!", "success");
    }
  };

  // Sync state with dynamic session caches
  useEffect(() => {
    if (activeTab === 'exam' && examStep === 'quiz') {
      localStorage.setItem('nst_assessment_key_v2', JSON.stringify({
        userData,
        answers,
        currentQuestionIndex,
        activeTab,
        examStep,
        randomizedQuestionsList
      }));
    } else if (examStep === 'result' || examStep === 'gate') {
      localStorage.removeItem('nst_assessment_key_v2');
    }
  }, [activeTab, examStep, answers, currentQuestionIndex, userData, randomizedQuestionsList]);

  // Per specific question time counter
  useEffect(() => {
    if (activeTab === 'exam' && examStep === 'quiz' && questionTimeLeft > 0) {
      timerRef.current = setInterval(() => {
        setQuestionTimeLeft(prev => {
          if (prev <= 16 && prev > 1) {
            synthSvc.playTick();
          }
          return prev - 1;
        });
      }, 1000);
    } else if (questionTimeLeft === 0 && activeTab === 'exam' && examStep === 'quiz') {
      synthSvc.playAlert();
      triggerInstantToast("Time expired on current question! Swapping...", "warning");
      triggerProceedNext();
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activeTab, examStep, questionTimeLeft]);

  const EXAM_TOTAL_LIMIT_SEC = 900; // 15 minutes max
  const examTotalTimeLeft = Math.max(0, EXAM_TOTAL_LIMIT_SEC - totalTimeTaken);
  const isTimerPressureActive = activeTab === 'exam' && examStep === 'quiz' && examTotalTimeLeft <= 300;

  // Track overall session countdown timeout
  useEffect(() => {
    if (activeTab === 'exam' && examStep === 'quiz' && examTotalTimeLeft <= 0) {
      synthSvc.playAlert();
      triggerInstantToast("Assessment time limit expired! Automatically filing responses...", "warning");
      commenceScanningComputation();
    }
  }, [examTotalTimeLeft, activeTab, examStep]);

  // Overall time track accumulator
  useEffect(() => {
    if (activeTab === 'exam' && examStep === 'quiz') {
      totalTimerRef.current = setInterval(() => {
        setTotalTimeTaken(prev => {
          const nextVal = prev + 1;
          const timeLeft = EXAM_TOTAL_LIMIT_SEC - nextVal;
          if (timeLeft <= 300 && timeLeft > 0) {
            // Heartbeat audio synthesized on each tick
            synthSvc.playHeartbeat();
          }
          return nextVal;
        });
      }, 1000);
    } else {
      if (totalTimerRef.current) clearInterval(totalTimerRef.current);
    }
    return () => {
      if (totalTimerRef.current) clearInterval(totalTimerRef.current);
    };
  }, [activeTab, examStep]);

  // Passcode trigger checks
  const processSecureExamEntry = (e: React.FormEvent) => {
    e.preventDefault();
    const correctCerts: Record<string, string> = {
      'Web Designing': 'NSTECHWEB',
      'Tally': 'NSTECHTALLY',
      'Basic Computer': 'NSTECHBASIC'
    };

    if (userData.password !== correctCerts[userData.course]) {
      synthSvc.playAlert();
      triggerInstantToast("Verification failed: passcode key is invalid!", "warning");
      return;
    }

    if (userData.name.trim()) {
      synthSvc.playSwell();
      generateRandomShuffledSyllabus(userData.course);
      
      // Enter the quiz setup
      setQuestionTimeLeft(60);
      setTotalTimeTaken(0);
      setCurrentQuestionIndex(0);
      setAnswers({});
      setWarnings(0);
      
      // Open the gorgeous cinematic welcome popup
      setShowWelcomePopup(true);
      triggerInstantToast(`Secure credentials verified for ${userData.name}!`, "success");
    }
  };

  const handleSelectResponse = (val: string) => {
    synthSvc.playClick();
    setAnswers(prev => ({ ...prev, [currentQuestionIndex]: val }));
  };

  const triggerProceedNext = () => {
    synthSvc.playClick();
    if (currentQuestionIndex < currentExamQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setQuestionTimeLeft(60);
    } else {
      setExamStep('review');
    }
  };

  const triggerProceedPrevious = () => {
    synthSvc.playClick();
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setQuestionTimeLeft(60);
    }
  };

  // Interactive Scan effect and grade evaluator
  const commenceScanningComputation = () => {
    synthSvc.playSwell();
    setExamStep('scanning');
    setScanningProgress(0);
    
    let count = 0;
    const scanInterval = setInterval(() => {
      count += Math.floor(Math.random() * 12) + 4;
      if (count >= 100) {
        count = 100;
        clearInterval(scanInterval);
        
        // Tabulate secure outputs
        let finalTalliedScore = 0;
        currentExamQuestions.forEach((item, index) => {
          if (answers[index] === item.answer) {
            finalTalliedScore++;
          }
        });
        
        setScore(finalTalliedScore);
        setExamStep('result');
        setIsDrumrollActive(true);
        triggerInstantToast("Holographic core evaluations submitted...", "info");
        
        let tickTimes = 0;
        const drumInterval = setInterval(() => {
          synthSvc.playTick();
          tickTimes++;
          if (tickTimes >= 12) {
            clearInterval(drumInterval);
          }
        }, 120);

        setTimeout(() => {
          setIsDrumrollActive(false);
          triggerInstantToast("Grade calculations assembled!", "success");
          
          const accuracyPercent = (finalTalliedScore / currentExamQuestions.length) * 100;
          let confColors = ['#00d2ff', '#3b82f6', '#ffffff']; // Low score (blue)
          if (accuracyPercent >= 90) {
            confColors = ['#ffd700', '#f59e0b', '#d97706']; // High score (gold)
          } else if (accuracyPercent >= 50) {
            confColors = ['#a855f7', '#d946ef', '#c084fc']; // Medium score (purple)
          }

          confetti({
            particleCount: 160,
            spread: 80,
            origin: { y: 0.6 },
            colors: confColors
          });

          synthSvc.playSuccess();
        }, 1500);
      }
      setScanningProgress(count);
      if (count < 30) {
        setScanningStatus('TRANSMITTING ANSWERS TO AI VALIDATOR CORE...');
      } else if (count < 65) {
        setScanningStatus('AUDITING SESSION INTEGRITY LOGS...');
      } else if (count < 90) {
        setScanningStatus('COMPUTING GRADE ACCURACY INDEX...');
      } else {
        setScanningStatus('DECRYPTATION COMPLETE • METRICS SECURED!');
      }
    }, 150);
  };

  const handleForceSubmit = () => {
    let finalTalliedScore = 0;
    currentExamQuestions.forEach((item, index) => {
      if (answers[index] === item.answer) {
        finalTalliedScore++;
      }
    });
    setScore(finalTalliedScore);
    setExamStep('result');
    setShowSubmitModal(false);
  };

  // Score accumulation animation on result screen
  useEffect(() => {
    if (examStep === 'result') {
      let runTracker = 0;
      const targetScore = score;
      if (runTracker === targetScore) {
        setAnimatedScore(targetScore);
        return;
      }
      const animRate = targetScore / 40;
      const clock = setInterval(() => {
        runTracker += animRate;
        if (runTracker >= targetScore) {
          setAnimatedScore(targetScore);
          clearInterval(clock);
        } else {
          setAnimatedScore(Math.floor(runTracker));
        }
      }, 20);
      return () => clearInterval(clock);
    } else {
      setAnimatedScore(0);
    }
  }, [examStep, score]);

  const toggleSecureFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {
        triggerInstantToast("Note: External container frames may restrict full browser screen override", "info");
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const calculateRemainingSecondsTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const motivationalAIMessage = useMemo(() => {
    const answeredCount = Object.keys(answers).length;
    const totalQuestions = currentExamQuestions.length || 1;
    const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

    if (progressPercent <= 20) {
      return "Focus Mode Activated";
    } else if (progressPercent <= 40) {
      return "Great Progress 🚀";
    } else if (progressPercent <= 60) {
      return "Keep Going 🔥";
    } else if (progressPercent <= 80) {
      return "Excellent Accuracy ⚡";
    } else {
      return "Success is Near";
    }
  }, [answers, currentExamQuestions]);

  const percentageGradeRatio = (score / currentExamQuestions.length) * 100;
  const isSufficientlyPassed = percentageGradeRatio >= 40;

  // Grade performance descriptors depending on final score accuracy ratios
  const performance = useMemo(() => {
    const pct = percentageGradeRatio;
    if (pct >= 90) {
      return {
        rank: 'Elite Specialist',
        msg: 'Distinction Authorized',
        icon: '🏆'
      };
    } else if (pct >= 60) {
      return {
        rank: 'Qualified Operator',
        msg: 'Pass Standard Attained',
        icon: '⚡'
      };
    } else {
      return {
        rank: 'Aspirant',
        msg: 'Calibration Failed',
        icon: '⚠️'
      };
    }
  }, [percentageGradeRatio]);

  // Real intelligence review generator based on exact score, syllabus and proctor metrics
  const customAIProcText = useMemo(() => {
    const accuracy = percentageGradeRatio;
    let comment = '';
    if (accuracy >= 90) {
      comment = `AI proctor validation scores your performance at elite levels. Your response speed coefficients suggest excellent mastery over '${userData.course}' fundamentals. Minimal security variances detected. Certified high-tier credentials authorized for generation.`;
    } else if (accuracy >= 65) {
      comment = `Adequate cognitive response profile established. The system noted strong correct chains in several consecutive milestones. Some knowledge limits indicated in challenging structures. Security compliance parameters remain stable.`;
    } else if (accuracy >= 40) {
      comment = `Minimum baseline criteria achieved. Focus profiles suggest moderate core knowledge with variance in processing. Further training cycles highly suggested in specific areas of '${userData.course}'.`;
    } else {
      comment = `Syllabus minimum threshold not completed during this cycle. System log advises extensive review over '${userData.course}' modules. Cognitive answers showed confusion patterns. Recalibration strongly advised.`;
    }
    return comment;
  }, [percentageGradeRatio, userData.course]);

  // SMART THEME DYNAMIC ATTRIBUTES
  const themeDetails = useMemo(() => {
    if (examStep !== 'result' && examStep !== 'certificate') {
      return {
        accentGlow: 'rgba(0, 210, 255, 0.45)',
        accentBg: 'bg-gradient-to-r from-cyan-500 to-blue-600',
        borderColor: 'border-cyan-500/30',
        glowText: 'text-cyan-400',
        metaHex: '#00d2ff',
        auraGlow: 'bg-glow-web'
      };
    }
    if (percentageGradeRatio >= 90) {
      return {
        accentGlow: 'rgba(234, 179, 8, 0.55)',
        accentBg: 'bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600',
        borderColor: 'border-yellow-500/40 shadow-[0_0_20px_rgba(234,179,8,0.2)]',
        glowText: 'text-yellow-400',
        metaHex: '#eab308',
        auraGlow: 'bg-glow-tally'
      };
    } else if (percentageGradeRatio >= 50) {
      return {
        accentGlow: 'rgba(168, 85, 247, 0.55)',
        accentBg: 'bg-gradient-to-r from-purple-500 to-fuchsia-600',
        borderColor: 'border-purple-500/40 shadow-[0_0_20px_rgba(168,85,247,0.2)]',
        glowText: 'text-purple-400',
        metaHex: '#a855f7',
        auraGlow: 'bg-glow-computer'
      };
    } else {
      return {
        accentGlow: 'rgba(59, 130, 246, 0.45)',
        accentBg: 'bg-gradient-to-r from-blue-600 to-indigo-700',
        borderColor: 'border-blue-500/30',
        glowText: 'text-blue-400',
        metaHex: '#3b82f6',
        auraGlow: 'bg-glow-web'
      };
    }
  }, [examStep, percentageGradeRatio]);

  // Interactive FAQ query management
  const [faqCriteria, setFaqCriteria] = useState('');
  const [openedFaqIndices, setOpenedFaqIndices] = useState<Record<number, boolean>>({});

  const faqItemsList = [
    {
      q: "How to start exam?",
      a: "Select your desired syllabus track on the entry gateway, input the secure passcode, and click Validate to start."
    },
    {
      q: "Is mobile supported?",
      a: "Yes, the entire portal is fully responsive and supports all smartphones, tablets, and desktop displays perfectly."
    },
    {
      q: "How are results calculated?",
      a: "Results are evaluated instantly upon submission. The score calculates accuracy percentage, speed, and focus warning flags."
    },
    {
      q: "Can I retake exam?",
      a: "Yes, you can return to the entry gateway and re-verify your secure credentials to initiate a new randomized session."
    },
    {
      q: "Is webcam required?",
      a: "No webcam is required. Security is maintained through browser-level tab visibility monitors and advanced anti-cheat features."
    },
    {
      q: "How does anti-cheat work?",
      a: "The portal monitors tab focus switches, window blurring, and prohibited standard keys on your device. Accumulating three security infractions triggers automated score compilation, ending assessment immediately."
    }
  ];

  const filteredFaqList = useMemo(() => {
    if (!faqCriteria.trim()) return faqItemsList;
    return faqItemsList.filter(item => 
      item.q.toLowerCase().includes(faqCriteria.toLowerCase()) || 
      item.a.toLowerCase().includes(faqCriteria.toLowerCase())
    );
  }, [faqCriteria]);

  const handleToggleFaqIndex = (index: number) => {
    synthSvc.playClick();
    setOpenedFaqIndices(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="min-h-screen bg-[#03060d] text-white overflow-x-hidden font-sans select-none relative pb-28 md:pb-12">
      {/* Background Neon Spot Spotlight cursor trace */}
      <div 
        className="pointer-events-none fixed z-20 w-[450px] h-[450px] rounded-full opacity-30 mix-blend-screen transition-transform duration-200"
        style={{
          background: `radial-gradient(circle, ${themeDetails.metaHex}33 0%, transparent 70%)`,
          left: `${mouseCoord.x - 225}px`,
          top: `${mouseCoord.y - 225}px`,
        }}
      />

      {/* Cyber Grid Pattern Background Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />
      
      {/* Dynamic Aurora Atmospheric Glows */}
      <div className={`fixed inset-0 pointer-events-none z-0 opacity-40 transition-all duration-1000 ${themeDetails.auraGlow}`} />

      {/* Dynamic Timer Pressure Tension Overlay (Last 5 minutes red heartbeat) */}
      {isTimerPressureActive && (
        <div className="fixed inset-0 pointer-events-none z-[90] border-[6px] md:border-[12px] border-rose-500/15 animate-pulse shadow-[inset_0_0_80px_rgba(244,63,94,0.18)] flex justify-center items-start pt-24">
          <div className="px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 font-mono text-[10px] font-bold tracking-widest uppercase flex items-center gap-2 animate-bounce shadow-lg shadow-rose-950/20">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            CRITICAL SECURE SESSION TIMEOUT COUNTDOWN : PASSING COMPLIANCE RUN REQUIRED
          </div>
        </div>
      )}

      {/* Anti-cheat interface screen flashing guard */}
      {antiCheatFlashActive && (
        <div className="fixed inset-0 z-[1000] bg-rose-600/90 pointer-events-none transition-opacity duration-300 flex items-center justify-center">
          <div className="text-center text-white scale-125">
            <ShieldAlert size={80} className="mx-auto mb-4 animate-bounce" />
            <p className="text-2xl font-black uppercase tracking-wider">RESTRICTED SHORTCUT INBOUND!</p>
          </div>
        </div>
      )}

      {/* Device Orientation rotation prompt panel */}
      {!isPortrait && (
        <div className="rotation-warning flex flex-col items-center justify-center text-center p-8 bg-[#040812]/95 z-[999]">
          <Smartphone size={55} className="text-cyan-400 mb-4 animate-bounce" />
          <h2 className="text-2xl font-extrabold tracking-tight uppercase mb-2">Refit Device Alignment</h2>
          <p className="text-sm text-white/60">Immersive examination safety frameworks require portrait orientation on small layouts.</p>
        </div>
      )}

      {/* Cinematic Hacker Loader Boot sequence */}
      <AnimatePresence>
        {isLoaderBooting && (
          <motion.div 
            key="hacker-boot-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#03050a] z-[1000] flex flex-col items-center justify-center p-6"
          >
            <div className="max-w-md w-full relative">
              {/* Spinning hacker graphics */}
              <div className="relative w-28 h-28 mx-auto mb-10 flex items-center justify-center">
                <div className="absolute inset-0 border-4 border-dashed border-cyan-500/20 rounded-full animate-spin" style={{ animationDuration: '10s' }} />
                <div className="absolute inset-2 border-2 border-dotted border-purple-500/40 rounded-full animate-spin" style={{ animationDuration: '6s', animationDirection: 'reverse' }} />
                <Cpu size={40} className="text-cyan-400 animate-pulse" />
              </div>
              
              <h2 className="text-xl sm:text-2xl font-black font-mono tracking-tighter text-center uppercase text-white mb-2">
                ASSESS-PORTAL SETUP
              </h2>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 relative z-10 mb-4 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-600 shadow-[0_0_10px_rgba(6,182,212,0.8)] transition-all duration-300 ease-out"
                  style={{ width: `${bootProgress}%` }}
                />
              </div>
              
              <div className="flex justify-between font-mono text-xs text-[#00d2ff] mb-8 px-1 select-none">
                <div className="relative overflow-hidden min-w-[220px]">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={bootStatusText}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.15 }}
                      className="font-bold tracking-wider uppercase text-cyan-400 drop-shadow-[0_0_8px_rgba(0,210,255,0.4)] block text-left"
                    >
                      {bootStatusText}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <span className="font-black text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]">{bootProgress}%</span>
              </div>
              
              <div className="bg-[#0b101f] border border-white/5 p-4 rounded-xl font-mono text-[10px] text-zinc-400 space-y-1 text-left relative overflow-hidden">
                <div className="absolute right-2 top-2 w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                <p className="text-emerald-400">[OK] SECURITY CONTAINER LOADED</p>
                <p className="text-zinc-500">[TRACE] ATTAINMENT HOOK HASH KEY ENABLED</p>
                <p className="text-cyan-400">[BOOT] SYNTH GENERATOR CHONG RE-INDEXED</p>
                <p className="text-zinc-500">[LOAD] RESUME BACKUP EXAM RECOVERY ONLINE</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recover unused/unfinished active examination state overlay */}
      <AnimatePresence>
        {isResumingExam && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-card p-6 sm:p-8 max-w-sm w-full border border-cyan-500/30 text-center shadow-[0_0_30px_rgba(6,182,212,0.15)]"
            >
              <div className="w-14 h-14 bg-cyan-500/10 text-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-cyan-500/20">
                <RotateCcw size={26} className="animate-spin" style={{ animationDuration: '5s' }} />
              </div>
              <h3 className="text-lg font-black uppercase tracking-tight text-white mb-2">Restore Backup Exam?</h3>
              <p className="text-xs sm:text-sm text-zinc-400 mb-6 leading-relaxed">The AI firewall detected an unexpected session termination. Do you want to resume your current exam context?</p>
              <div className="flex gap-3">
                <button 
                  onClick={() => {
                    localStorage.removeItem('nst_assessment_key_v2');
                    setIsResumingExam(false);
                    triggerInstantToast("Backup logs recycled. Begin first pass.", "info");
                  }}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer text-zinc-400"
                >
                  Discard
                </button>
                <button 
                  onClick={initRestoredSession}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)] text-black font-extrabold text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  Restore
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Cyber/Interactive Main Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#040813]/80 backdrop-blur-md border-b border-white/5 p-4 md:px-8 flex items-center justify-between no-print">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-cyan-950/40 border border-cyan-400/30 rounded-xl flex items-center justify-center shadow-md transform hover:rotate-12 transition-transform select-none">
            <Cpu size={18} className="text-cyan-400 animate-pulse" />
          </div>
          <div className="text-left">
            <h1 className="text-sm font-black tracking-tight tracking-wider text-white uppercase sm:text-base">NS TECHNOLOGY</h1>
            <p className="text-[9px] text-cyan-400 font-mono tracking-widest leading-none">AI CORE PORTAL v2.4</p>
          </div>
        </div>

        {/* Current status display inside ongoing assessments */}
        {activeTab === 'exam' && examStep === 'quiz' && (
          <div className="flex items-center gap-3 bg-[#0a1020] border border-cyan-500/20 px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-[10px] md:text-xs font-mono text-zinc-300 font-semibold truncate max-w-[80px] md:max-w-none uppercase">
              {userData.name}
            </span>
            <div className="h-3 w-px bg-white/10" />
            <span className="text-[10px] md:text-xs font-mono text-cyan-400 font-bold">
              {calculateRemainingSecondsTime(totalTimeTaken)}
            </span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setSoundToggle(!soundToggle)}
            className="p-2 hover:bg-white/5 text-zinc-400 hover:text-white rounded-xl transition-all cursor-pointer"
            title="Toggle Sound Effects Feedback"
          >
            {soundToggle ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
        </div>
      </header>

      {/* Screen Frame Content Wrapper */}
      <main className="pt-24 pb-8 px-4 flex flex-col items-center justify-center relative z-10">
        <AnimatePresence mode="wait">
          {/* ====================================================
              1. HOME PAGE COMPONENT TABVIEW
              ==================================================== */}
          {activeTab === 'home' && (
            <motion.div 
              key="home-screen"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="max-w-5xl w-full space-y-12 text-center"
            >
              {/* Epic Cyberpunk Hero Headline with Aurora Animated Glows inside a Premium glassmorphic hero container */}
              <div className="glass-card max-w-4xl mx-auto p-8 sm:p-12 md:p-16 relative overflow-hidden space-y-8 shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/10">
                {/* Floating Aurora Light Effect Layers */}
                <div className="absolute -top-12 -left-12 w-96 h-96 rounded-full bg-cyan-500/15 blur-[100px] pointer-events-none animate-pulse" />
                <div className="absolute -bottom-12 -right-12 w-96 h-96 rounded-full bg-purple-500/15 blur-[100px] pointer-events-none animate-pulse-slow" />
                
                {/* Clean, high-performance interactive logo with gentle floating states */}
                <div className="flex justify-center pb-2 select-none pointer-events-none">
                  <motion.div 
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border-2 border-cyan-400/30 rounded-full shadow-[0_0_35px_rgba(6,182,212,0.3)]"
                  >
                    {/* Glowing outer orbit ring */}
                    <div className="absolute inset-0 border border-purple-500/20 rounded-full animate-spin" style={{ animationDuration: '12s' }} />
                    <Cpu size={48} className="text-cyan-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.6)] animate-pulse" />
                  </motion.div>
                </div>

                <div className="space-y-3">
                  <span className="bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-bold tracking-widest uppercase px-4 py-1.5 rounded-full inline-flex gap-2 items-center mx-auto shadow-md">
                    <Cpu size={12} className="animate-spin" style={{ animationDuration: '4s' }} /> ADVANCED COGNITIVE ASSESSMENT PLATFORM
                  </span>

                  <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight uppercase">
                    NS TECHNOLOGY <br />
                    <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                      AI EXAMINATION PORTAL
                    </span>
                  </h1>

                  <p className="max-w-2xl mx-auto text-base sm:text-lg text-cyan-400 font-bold tracking-wide uppercase">
                    Secure • Intelligent • Futuristic Online Examination Experience
                  </p>
                </div>

                <div className="h-8 max-w-xl mx-auto flex items-center justify-center font-mono text-xs text-zinc-400 tracking-wider">
                  <span className="border-r-2 border-cyan-400 pr-1.5 animate-pulse text-white/90">
                    STATUS: {typingText || "INITIALIZING SYLLABUS GATEWAY..."}
                  </span>
                </div>

                <p className="max-w-2xl mx-auto text-sm sm:text-base text-zinc-400 font-medium leading-relaxed font-sans">
                  A modern AI-powered examination platform with secure assessments, smart analytics, anti-cheat protection, and immersive user experience.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                  <button 
                    onClick={() => {
                      synthSvc.playClick();
                      setActiveTab('exam');
                      setExamStep('gate');
                    }}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white text-xs uppercase tracking-widest font-black shadow-[0_0_30px_rgba(6,182,212,0.45)] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer border border-cyan-400/30"
                    id="cta-start-exam"
                  >
                    Start Exam <Zap size={14} />
                  </button>
                  <button 
                    onClick={() => {
                      synthSvc.playClick();
                      setActiveTab('faq');
                    }}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-white/10 hover:border-cyan-500/35 hover:bg-cyan-500/5 text-zinc-300 hover:text-white text-xs uppercase tracking-widest font-black transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                    id="cta-explore-portal"
                  >
                    Explore Portal <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ====================================================
              2. EXAM MODULE INTERACTIVE AREA
              ==================================================== */}
          {activeTab === 'exam' && (
            <motion.div 
              key="exam-screen"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="max-w-5xl w-full"
            >
              {/* Exam Step: Gate Screen Passcode Authentication */}
              {examStep === 'gate' && (
                <div className="max-w-md w-full mx-auto">
                  <div className="glass-card p-8 border border-white/10 text-center relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
                    
                    <div className="mb-8 space-y-2">
                      <div className="w-14 h-14 rounded-full bg-cyan-950/40 border border-cyan-400/30 flex items-center justify-center mx-auto mb-4 hover:border-cyan-400 transition-colors">
                        <Lock size={22} className="text-cyan-400" />
                      </div>
                      <h2 className="text-xl sm:text-2xl font-black uppercase text-white tracking-wider">SECURE ASSESSMENT GATEWAY</h2>
                      <p className="text-xs text-zinc-400 max-w-xs mx-auto">Input registration credentials to authorize and launch the evaluation matrix.</p>
                    </div>

                    <form onSubmit={processSecureExamEntry} className="space-y-5 text-left">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest flex items-center gap-1.5 label-input-header">
                          <User size={12} className="text-cyan-400" /> EXAMINEE FULL NAME
                        </label>
                        <input 
                          type="text"
                          required
                          placeholder="e.g. Suraj Rawat"
                          value={userData.name}
                          onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                          className="input-field w-full text-xs hover:border-white/25 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 focus:bg-[#0e1425] transition-all bg-[#080d19] py-3.5"
                          id="name-credential-field"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest flex items-center gap-1.5 label-input-header">
                          <BookOpen size={12} className="text-cyan-400" /> ACADEMIC SYLLABUS PATH
                        </label>
                        <div className="relative">
                          <select 
                            value={userData.course}
                            onChange={(e) => setUserData(prev => ({ ...prev, course: e.target.value as any }))}
                            className="input-field w-full text-xs appearance-none pr-10 cursor-pointer hover:border-white/25 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 focus:bg-[#0e1425] transition-all bg-[#080d19] py-3.5"
                          >
                            <option value="Basic Computer">Basic Computer (NSTECHBASIC)</option>
                            <option value="Tally">Tally ERP / Prime (NSTECHTALLY)</option>
                            <option value="Web Designing">Web Designing (NSTECHWEB)</option>
                          </select>
                          <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest flex items-center gap-1.5 label-input-header">
                          <Lock size={12} className="text-cyan-400" /> SECURE GATE VERIFICATION KEY
                        </label>
                        <div className="relative">
                          <input 
                            type={showPassword ? "text" : "password"}
                            required
                            placeholder="Input verification passcode"
                            value={userData.password}
                            onChange={(e) => setUserData(prev => ({ ...prev, password: e.target.value }))}
                            className="input-field w-full text-xs pr-12 hover:border-white/25 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 focus:bg-[#0e1425] transition-all bg-[#080d19] py-3.5 font-mono"
                            id="passcode-credential-field"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              synthSvc.playClick();
                              setShowPassword(!showPassword);
                            }}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-cyan-400 transition-all duration-200 focus:outline-none cursor-pointer p-1.5 flex items-center justify-center rounded-lg hover:bg-white/5 active:scale-90"
                            title={showPassword ? "Mask Passcode" : "Unmask Passcode"}
                          >
                            {showPassword ? <EyeOff size={15} className="transition-transform duration-300 rotate-180" /> : <Eye size={15} className="transition-transform duration-300" />}
                          </button>
                        </div>
                      </div>

                      <button 
                        type="submit"
                        className="w-full mt-4 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-black text-xs uppercase tracking-widest transition-all hover:scale-102 active:scale-98 cursor-pointer shadow-[0_0_20px_rgba(6,182,212,0.25)] flex items-center justify-center gap-2 border border-cyan-400/20"
                        id="form-secure-auth-btn"
                      >
                        VALIDATE SECURE KEY <ChevronRight size={14} />
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {/* Exam Step: ACTIVE CHRONOS ASSESSMENT CANVAS */}
              {examStep === 'quiz' && (
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 text-left">
                  {/* HUD Dashboard Navigation sidebar */}
                  <div className="hidden lg:block space-y-4">
                    <div className="glass-card p-5 border border-white/5 sticky top-24 space-y-4 shadow-lg">
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-mono flex items-center gap-2">
                        <Hash size={12} className="text-cyan-400" /> NAVIGATION INDEX
                      </h4>
                      <div className="grid grid-cols-4 gap-2">
                        {currentExamQuestions.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              synthSvc.playClick();
                              setCurrentQuestionIndex(idx);
                              setQuestionTimeLeft(60);
                            }}
                            className={`w-9 h-9 rounded-lg font-mono text-xs font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center border
                              ${currentQuestionIndex === idx ? 'bg-cyan-500 border-cyan-400 text-black shadow-[0_0_10px_rgba(6,182,212,0.4)]' : 
                                answers[idx] ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400' : 
                                'bg-white/5 border-white/10 text-zinc-500 hover:border-zinc-400 hover:text-white'}`}
                          >
                            {(idx + 1).toString().padStart(2, '0')}
                          </button>
                        ))}
                      </div>

                      <div className="pt-4 border-t border-white/5 space-y-2 text-[10px] text-zinc-400">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                          <span>Active Assessment Node</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500/30 border border-emerald-500" />
                          <span>Response Vector Encoded</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-white/5 border border-white/10" />
                          <span>Unexecuted Target</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Operational Question Content frame */}
                  <div className="lg:col-span-3 space-y-4">
                    {/* Urgency warning HUD heartbeat banner */}
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#050914] p-3 rounded-2xl border border-white/5">
                      <div className="flex items-center gap-3">
                        <div className={`px-4 py-1.5 rounded-lg font-mono text-sm font-black tracking-tight border flex items-center gap-2
                          ${questionTimeLeft <= 15 ? 'bg-rose-500/10 border-rose-500/30 text-rose-400 animate-pulse' : 'bg-white/5 border-white/10 text-cyan-400'}`}
                        >
                          <Timer size={14} className={questionTimeLeft <= 15 ? 'animate-spin' : ''} style={{ animationDuration: '4s' }} />
                          <span>{questionTimeLeft}s</span>
                        </div>
                        
                        <p className="text-[10px] sm:text-xs font-mono font-bold text-zinc-300 tracking-wider uppercase">
                          QUESTION {currentQuestionIndex + 1} of {currentExamQuestions.length}
                        </p>
                      </div>

                      {/* HUD dynamic prompt indicator */}
                      <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#00d2ff] bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full text-center">
                        {hudPrompt}
                      </span>
                    </div>

                    {/* Core Quiz Content card */}
                    <div className="glass-card p-6 sm:p-8 md:p-10 border border-white/5 relative overflow-hidden text-left glow-border min-h-[400px] flex flex-col justify-between">
                      {/* Top horizontal timeline tracker */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-white/5">
                        <div 
                          className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 transition-all duration-300 shadow-[0_0_12px_rgba(6,182,212,0.5)]"
                          style={{ width: `${((currentQuestionIndex + 1) / currentExamQuestions.length) * 100}%` }}
                        />
                      </div>

                      {/* Animated AI Motivational Message in Compact Minimal Popup Style with Neon Glow */}
                      <div className="mt-4">
                        <AnimatePresence mode="wait">
                          <motion.div 
                            key={motivationalAIMessage}
                            initial={{ opacity: 0, y: -8, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.96 }}
                            transition={{ duration: 0.25 }}
                            className="p-2.5 rounded-xl bg-cyan-950/20 border border-cyan-400/30 text-cyan-400 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.15)] select-none"
                          >
                            <Sparkles size={11} className="text-cyan-400 animate-pulse" />
                            <span>{motivationalAIMessage}</span>
                          </motion.div>
                        </AnimatePresence>
                      </div>

                      {/* Question Text details */}
                      <div className="space-y-6 pt-4 mb-8">
                        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-relaxed">
                          {currentExamQuestions[currentQuestionIndex].question}
                        </h2>

                        <div className="grid grid-cols-1 gap-4">
                          {currentExamQuestions[currentQuestionIndex].options.map((option, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleSelectResponse(option)}
                              className={`w-full p-4 sm:p-5 rounded-xl border text-left text-sm sm:text-base font-medium flex items-center gap-4 transition-all hover:scale-[1.01] cursor-pointer
                                ${answers[currentQuestionIndex] === option 
                                  ? 'bg-[#0f2142] border-cyan-500/40 text-white shadow-[0_0_20px_rgba(6,182,212,0.15)] glow-border bounce-on-select' 
                                  : 'bg-white/5 border-white/10 hover:border-white/20 text-zinc-300 hover:text-white hover:bg-white/[0.08]'}`}
                            >
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors
                                ${answers[currentQuestionIndex] === option ? 'border-cyan-400 bg-cyan-500' : 'border-zinc-500'}`}>
                                {answers[currentQuestionIndex] === option && (
                                  <div className="w-1.5 h-1.5 bg-black rounded-full" />
                                )}
                              </div>
                              <span className="flex-1">{option}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Frame Actions control row on large environments */}
                      <div className="flex items-center justify-between pt-6 border-t border-white/5">
                        <button 
                          disabled={currentQuestionIndex === 0}
                          onClick={triggerProceedPrevious}
                          className="px-5 py-2.5 rounded-xl border border-white/10 hover:border-cyan-500/30 hover:bg-cyan-500/5 text-zinc-400 hover:text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer flex items-center gap-2"
                        >
                          <ChevronLeft size={14} /> Previous
                        </button>

                        <button 
                          onClick={triggerProceedNext}
                          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] border border-cyan-400/20 hover:border-cyan-400/50 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
                        >
                          {currentQuestionIndex === currentExamQuestions.length - 1 ? 'Submit Exam' : 'Next'} <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Exam Step: Secure Review metrics ledger */}
              {examStep === 'review' && (
                <div className="max-w-3xl w-full mx-auto text-left">
                  <div className="glass-card p-6 sm:p-10 border border-white/5 relative overflow-hidden glow-border">
                    <div className="absolute top-0 right-0 w-44 h-44 bg-cyan-500/5 blur-[50px]" />
                    
                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white uppercase text-center mb-1">
                      Cognitive Review Ledger
                    </h2>
                    <p className="text-xs text-zinc-400 text-center mb-8">Confirm correct answer allocations before compiling grade metrics.</p>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="bg-emerald-500/5 border border-emerald-500/15 p-4 rounded-xl text-center">
                        <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">Responses Encoded</span>
                        <p className="text-3xl font-black text-white font-mono mt-1">
                          {Object.keys(answers).length}
                        </p>
                      </div>
                      <div className="bg-rose-500/5 border border-rose-500/15 p-4 rounded-xl text-center">
                        <span className="text-[10px] font-mono text-rose-400 uppercase tracking-widest font-bold">Pending Index Tasks</span>
                        <p className="text-3xl font-black text-white font-mono mt-1">
                          {currentExamQuestions.length - Object.keys(answers).length}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 mb-8 max-w-xl mx-auto">
                      {currentExamQuestions.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            synthSvc.playClick();
                            setCurrentQuestionIndex(idx);
                            setExamStep('quiz');
                            setQuestionTimeLeft(60);
                          }}
                          className={`w-10 h-10 rounded-lg flex items-center justify-center font-mono text-xs font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer
                            ${answers[idx] ? 'bg-cyan-500 text-black shadow-[0_0_8px_rgba(6,182,212,0.4)]' : 'bg-white/5 border border-white/10 text-zinc-500 hover:border-zinc-400'}`}
                        >
                          {idx + 1}
                        </button>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button 
                        onClick={() => {
                          synthSvc.playClick();
                          setCurrentQuestionIndex(0);
                          setExamStep('quiz');
                          setQuestionTimeLeft(60);
                        }}
                        className="px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 justify-center font-bold text-xs uppercase tracking-wider text-zinc-400 hover:text-white transition-all cursor-pointer flex items-center gap-2"
                      >
                        <ChevronLeft size={14} /> Returns to Canvas
                      </button>
                      <button 
                        onClick={() => {
                          const unanswered = currentExamQuestions.length - Object.keys(answers).length;
                          if (unanswered > 0) {
                            synthSvc.playAlert();
                            triggerInstantToast(`Secure notice: You have ${unanswered} answers unencoded!`, "warning");
                          }
                          setShowSubmitModal(true);
                        }}
                        className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 text-white font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                      >
                        Transmit Final Submission <CheckCircle2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Exam Step: Cinematic DECIPHERING Scanning Screen */}
              {examStep === 'scanning' && (
                <div className="max-w-md w-full mx-auto">
                  <div className="glass-card p-6 sm:p-10 border border-white/5 text-center relative overflow-hidden glow-border">
                    {/* Laser vertical sweeping line */}
                    <div className="absolute inset-x-0 h-0.5 bg-cyan-400 shadow-[0_0_15px_rgba(6,182,212,1)] animate-bounce" style={{ animationDuration: '2.5s' }} />
                    
                    <div className="mb-8 space-y-3">
                      <Cpu size={40} className="text-cyan-400 mx-auto animate-spin" style={{ animationDuration: '3s' }} />
                      <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight text-white">Compiling Cognitive Marks</h2>
                      <p className="text-xs text-zinc-500">Security container verification in process...</p>
                    </div>

                    <div className="space-y-4">
                      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden relative border border-white/5 shadow-md">
                        <div 
                          className="h-full bg-gradient-to-r from-cyan-400 to-purple-600 transition-all duration-150"
                          style={{ width: `${scanningProgress}%` }}
                        />
                      </div>
                      <div className="flex justify-between font-mono text-[9px] text-zinc-400">
                        <span className="animate-pulse">{scanningStatus}</span>
                        <span className="text-cyan-400 font-bold">{scanningProgress}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Exam Step: Cyberpunk Cinematic Results Dashboard */}
              {examStep === 'result' && (
                isDrumrollActive ? (
                  <div className="max-w-md w-full mx-auto space-y-6 text-center py-12 relative z-20" id="examination-drumroll-loader">
                    <div className="glass-card p-8 border border-cyan-500/30 shadow-[0_0_35px_rgba(6,182,212,0.15)] space-y-6 relative overflow-hidden">
                      <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-cyan-500/10 blur-3xl text-cyan-400" />
                      <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-purple-500/10 blur-3xl text-purple-400" />
                      
                      <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                        <div className="absolute inset-0 border-4 border-dashed border-cyan-400/40 rounded-full animate-spin" style={{ animationDuration: '3s' }} />
                        <div className="absolute inset-2 border-2 border-dotted border-purple-500/50 rounded-full animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }} />
                        <Trophy size={40} className="text-cyan-400 animate-bounce" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-lg font-mono font-black tracking-widest text-[#00d2ff] uppercase animate-pulse">
                          CALIBRATING GRADE VECTORS
                        </h3>
                        <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest max-w-xs mx-auto leading-relaxed">
                          Assembling blockchain hashes... Decrypting final proctor credentials... Secure cryptographic certification signature active...
                        </p>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 shadow-inner">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-600 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 1.5, ease: "linear" }}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="max-w-4xl w-full mx-auto space-y-6 text-left" id="examination-result-panel">
                  <div className="glass-card p-6 sm:p-10 border border-white/5 relative overflow-hidden shadow-[0_0_30px_rgba(0,210,255,0.05)] glow-border text-center">
                    {/* Inner glowing sparks depending on score */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-opacity-20 blur-[90px]" style={{ backgroundColor: themeDetails.metaHex }} />
                    
                    <div className="space-y-4 relative z-10 mb-8">
                      <div className="relative inline-block mx-auto select-none">
                        {/* Interactive SVG Circular Score Ring */}
                        <svg className="w-32 h-32 sm:w-36 sm:h-36 transform -rotate-90">
                          {/* Inner trail track */}
                          <circle
                            cx="64"
                            cy="64"
                            r="52"
                            className="stroke-white/10 fill-none"
                            strokeWidth="6"
                          />
                          {/* Active score completion arc */}
                          <motion.circle
                            cx="64"
                            cy="64"
                            r="52"
                            className="fill-none"
                            stroke={themeDetails.metaHex}
                            strokeWidth="6"
                            strokeDasharray={2 * Math.PI * 52}
                            initial={{ strokeDashoffset: 2 * Math.PI * 52 }}
                            animate={{ strokeDashoffset: 2 * Math.PI * 52 * (1 - score / currentExamQuestions.length) }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            strokeLinecap="round"
                          />
                        </svg>
                        {/* Centered score contents */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-none">
                            {animatedScore}
                          </span>
                          <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest leading-none mt-1">
                            OF {currentExamQuestions.length}
                          </span>
                        </div>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white">Grade Calibration Metrics</h2>
                      <p className={`text-base sm:text-lg font-bold uppercase tracking-wide px-4 py-1 rounded-full ${themeDetails.glowText} glow-text`}>
                        {performance.rank}: {performance.msg}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 text-left">
                      <div className="bg-white/5 p-4 rounded-xl border border-white/10 relative overflow-hidden">
                        <BarChart3 size={16} className="text-white/40 mb-2" />
                        <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest block mb-1">Grade Accuracy</span>
                        <p className="text-lg sm:text-xl font-mono font-bold text-white leading-none">
                          {(animatedScore / currentExamQuestions.length * 100).toFixed(1)}%
                        </p>
                      </div>
                      <div className="bg-white/5 p-4 rounded-xl border border-white/10 relative overflow-hidden">
                        <Target size={16} className="text-white/40 mb-2" />
                        <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest block mb-1">Correct Nodes</span>
                        <p className="text-lg sm:text-xl font-mono font-bold text-emerald-400 leading-none">
                          {animatedScore} <span className="text-xs text-zinc-500 font-mono">/ {currentExamQuestions.length}</span>
                        </p>
                      </div>
                      <div className="bg-white/5 p-4 rounded-xl border border-white/10 relative overflow-hidden">
                        <X size={16} className="text-white/40 mb-2" />
                        <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest block mb-1">Fault Ledger Code</span>
                        <p className="text-lg sm:text-xl font-mono font-bold text-rose-500 leading-none">
                          {currentExamQuestions.length - score}
                        </p>
                      </div>
                      <div className="bg-white/5 p-4 rounded-xl border border-white/10 relative overflow-hidden">
                        <Clock size={16} className="text-white/40 mb-2" />
                        <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest block mb-1">Duration Expended</span>
                        <p className="text-lg sm:text-xl font-mono font-bold text-cyan-400 leading-none font-mono">
                          {calculateRemainingSecondsTime(totalTimeTaken)}
                        </p>
                      </div>
                    </div>

                    {/* Highly advanced Simulated Proctor logs with evaluation comments */}
                    <div className="bg-white/5 border border-white/15 p-5 rounded-2xl mb-8 text-left relative overflow-hidden">
                      <div className="absolute right-3 top-3 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-2 flex items-center gap-2">
                        <Cpu size={14} className="text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} /> SECURE AI PROCTOR INTELLIGENCE REPORT
                      </h3>
                      <div className="text-xs text-zinc-400 font-mono space-y-2 leading-relaxed">
                        <p>{customAIProcText}</p>
                        <div className="border-t border-white/5 pt-2.5 mt-2.5 flex flex-wrap gap-x-6 gap-y-2 text-[10px]">
                          <span>PROCTOR ID: NS-MONITOR-09</span>
                          <span>WARNING INTERCEPTS: {warnings} / 3</span>
                          <span>SPEED FACTOR: {(totalTimeTaken / currentExamQuestions.length).toFixed(1)} Secs / Node</span>
                        </div>
                      </div>
                    </div>

                    {/* Instagram-style Shareable Result Card inside result dashboard */}
                    <div className="bg-gradient-to-tr from-[#05091a] to-[#0d1630] border border-white/5 p-5 sm:p-6 rounded-2xl text-center mb-8 max-w-sm mx-auto shadow-2xl relative">
                      <div className="absolute inset-0 bg-[#00d2ff]/5 opacity-30 blur-2xl" />
                      <div className="relative z-10 space-y-4">
                        <span className="bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[9px] font-mono tracking-widest uppercase px-3 py-1 rounded-full inline-block font-bold">
                          INSTAGRAM STORY GRADE TRANSCRIPT
                        </span>
                        
                        <div className="space-y-1">
                          <h4 className="text-xl font-black font-mono tracking-tighter text-white">EXAM PORTAL ATTAINMENT</h4>
                          <p className="text-xs text-zinc-400 font-mono">COURSE: {userData.course}</p>
                        </div>

                        <div className="py-4 bg-white/5 rounded-xl border border-white/5 backdrop-blur-md relative overflow-hidden">
                          <span className="text-3xl sm:text-4xl font-mono font-black text-[#00d2ff]">
                            {(score / currentExamQuestions.length * 100).toFixed(1)}% ACCURACY
                          </span>
                          <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-mono mt-1">CALIBRATED ON SYSTEM INTERFACES</p>
                        </div>

                        <p className="text-[10px] text-zinc-400 leading-relaxed font-mono italic">
                          "I scored {(score / currentExamQuestions.length * 100).toFixed(1)}% on NS TECHNOLOGY AI Exam Portal 🚀"
                        </p>
                        
                        <div className="flex gap-2">
                          <button 
                            onClick={() => {
                              synthSvc.playClick();
                              triggerInstantToast("Result card snapshot exported to documents queue", "success");
                            }}
                            className="flex-1 py-2 rounded-xl bg-[#111c34] hover:bg-[#18284b] text-white font-black text-[10px] uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5"
                          >
                            <Download size={12} /> Expose Image
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Informative examinee logs */}
                    <div className="bg-white/5 p-5 border border-white/10 rounded-2xl mb-8 text-left grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                      <div>
                        <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider block mb-0.5">CANDIDATE NOMINEE</span>
                        <p className="font-extrabold text-white leading-none">{userData.name}</p>
                      </div>
                      <div>
                        <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider block mb-0.5">Syllabus Track</span>
                        <p className="font-extrabold text-white leading-none">{userData.course}</p>
                      </div>
                      <div>
                        <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider block mb-0.5">Certified Attainment ID</span>
                        <p className="font-mono text-cyan-400 font-bold leading-none">{certificateId}</p>
                      </div>
                      <div>
                        <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider block mb-0.5">Authorized stamp Date</span>
                        <p className="font-mono text-zinc-300 font-semibold leading-none">{userData.date}</p>
                      </div>
                    </div>

                    {/* Result Actions block */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button 
                        onClick={() => {
                          synthSvc.playSwell();
                          setRandomizedQuestionsList([]);
                          setExamStep('gate');
                        }}
                        className="px-6 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-xs uppercase tracking-wider font-extrabold text-zinc-400 hover:text-white transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        <RefreshCw size={14} /> Recalibrate Assessment
                      </button>
                      <button 
                        onClick={() => {
                          synthSvc.playClick();
                          setIsReviewMode(!isReviewMode);
                        }}
                        className={`px-6 py-2.5 rounded-xl border text-xs uppercase tracking-wider font-extrabold transition-all cursor-pointer flex items-center justify-center gap-2
                          ${isReviewMode ? 'bg-[#101e38] border-cyan-500/30 text-cyan-440 shadow-[0_0_10px_rgba(6,182,212,0.15)]' : 'border-white/10 text-zinc-300 hover:text-white hover:bg-white/5'}`}
                      >
                        <Eye size={14} /> {isReviewMode ? 'Collapse Detailed Ledger' : 'Audit Response Vectors'}
                      </button>
                      
                      {isSufficientlyPassed && (
                        <button 
                          onClick={() => {
                            synthSvc.playSwell();
                            setExamStep('certificate');
                          }}
                          className={`${themeDetails.accentBg} px-6 py-2.5 rounded-xl text-black font-black text-xs uppercase tracking-wider shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2`}
                          id="proceed-view-certificate-btn"
                        >
                          <Award size={14} /> Dispatch Certificate
                        </button>
                      )}
                    </div>

                    {/* Expanded Response vector audit matrix */}
                    <AnimatePresence>
                      {isReviewMode && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-8 pt-8 border-t border-white/5 space-y-4 text-left overflow-hidden"
                        >
                          <h3 className="text-sm font-black font-mono tracking-wider uppercase text-cyan-400 mb-2">INTELLIGENT RESPONSE COMPARISON AUDIT</h3>
                          {currentExamQuestions.map((q, idx) => (
                            <div key={idx} className={`p-4 rounded-xl border relative overflow-hidden 
                              ${answers[idx] === q.answer ? 'bg-[#061e1b] border-emerald-500/20' : 'bg-[#1a0c10] border-rose-500/20'}`}
                            >
                              <div className="absolute top-2 right-2 font-mono text-[9px] uppercase tracking-wider opacity-30">
                                {answers[idx] === q.answer ? 'MATCH' : 'MISMATCH'}
                              </div>
                              <p className="font-extrabold text-[#ffffffeb] text-sm mb-3 flex gap-2">
                                <span className="font-mono text-xs opacity-50">#{(idx + 1).toString().padStart(2, '0')}.</span>
                                <span>{q.question}</span>
                              </p>
                              
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                                <div className={`p-2.5 rounded-lg flex items-center gap-2 font-mono ${answers[idx] === q.answer ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                                  {answers[idx] === q.answer ? <Check size={14} /> : <X size={14} />}
                                  <span>Allocated: {answers[idx] || 'NULL EXECUTED'}</span>
                                </div>
                                {answers[idx] !== q.answer && (
                                  <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 font-mono flex items-center gap-2">
                                    <Check size={14} /> Correct Target: {q.answer}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              )
            )}

              {/* Exam Step: PRINT-READY ATTAINMENT CERTIFICATE */}
              {examStep === 'certificate' && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="max-w-5xl w-full mx-auto px-1 sm:px-4"
                >
                  {/* Real printable container card */}
                  <div id="certificate-container" className="bg-white text-slate-900 shadow-2xl rounded relative border-[12px] border-double border-slate-300 p-6 sm:p-14 md:p-16 text-center">
                    {/* Inner detailed micro bounding border */}
                    <div className="absolute inset-4 border border-slate-200 pointer-events-none" />
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                         style={{ backgroundImage: 'radial-gradient(#002d72 1.5px, transparent 1.5px)', backgroundSize: '16px 16px' }} />

                    <div className="relative z-10 border border-slate-100 p-8 flex flex-col items-center">
                      <div className="flex justify-center mb-4">
                        <div className="w-14 h-14 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-lg">
                          <Trophy size={24} />
                        </div>
                      </div>

                      <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif font-black tracking-tight text-slate-800 uppercase mb-1">
                        Certificate of Achievement
                      </h1>
                      <div className="h-0.5 w-24 bg-slate-400 mx-auto mb-4" />
                      <p className="text-[9px] sm:text-[10px] font-sans font-black tracking-[0.3em] text-slate-400 uppercase">
                        NS TECHNOLOGY ACADEMICS COGNITIVE VERIFICATION
                      </p>

                      <div className="space-y-4 my-8 max-w-2xl text-slate-600">
                        <p className="text-sm font-serif italic text-slate-500">This is to certify that candidate nominee</p>
                        <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-slate-800 tracking-tight underline underline-offset-8 decoration-slate-300">
                          {userData.name}
                        </h2>
                        <p className="text-sm font-serif italic text-slate-500">has successfully completed all computational examinations as validated inside portal nodes for</p>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-wide text-slate-900 font-sans">
                          {userData.course}
                        </h3>
                      </div>

                      <div className="grid grid-cols-2 gap-4 my-8 text-center text-xs w-full max-w-md">
                        <div className="flex flex-col">
                          <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wide mb-0.5">Verification credential</span>
                          <span className="font-mono font-bold text-slate-700">{certificateId}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wide mb-0.5">Accuracy achieved</span>
                          <span className="font-mono font-bold text-slate-700">{percentageGradeRatio.toFixed(1)}% Passing grade</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full items-end mt-4 mb-4">
                        <div className="flex flex-col items-center sm:items-start text-xs text-slate-400">
                          <div className="w-full sm:w-40 border-b border-slate-300 italic text-slate-500 mb-1">NS Technology</div>
                          <span className="text-[8px] font-bold uppercase tracking-wide">Academics Board Signature</span>
                        </div>

                        <div className="flex justify-center py-2 sm:py-0">
                          <div className="relative">
                            <div className="w-16 h-16 border border-slate-200 rounded-full flex items-center justify-center bg-slate-50">
                              <Award size={24} className="text-slate-300" />
                            </div>
                            <div className="absolute inset-0 border border-dashed border-yellow-600/20 rounded-full animate-spin" style={{ animationDuration: '20s' }} />
                          </div>
                        </div>

                        <div className="flex flex-col items-center sm:items-end text-xs text-slate-400">
                          <div className="w-full sm:w-40 border-b border-slate-300 mb-1 text-slate-700 font-mono text-center sm:text-right">{userData.date}</div>
                          <span className="text-[8px] font-bold uppercase tracking-wide">Date of Attainment</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4 no-print select-none">
                    <button 
                      onClick={() => {
                        synthSvc.playClick();
                        setExamStep('result');
                      }}
                      className="px-6 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <ChevronLeft size={14} /> Return to Metrics
                    </button>
                    <button 
                      onClick={() => window.print()}
                      className={`px-8 py-2.5 rounded-xl bg-gradient-to-r ${themeDetails.accentBg} text-black font-black text-xs uppercase tracking-wider shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2`}
                    >
                      <Download size={14} /> Download Certificate (Print/PDF)
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* ====================================================
              3. FAQ SECTION WITH SMOOTH SEARCH COLLAPSE
              ==================================================== */}
          {activeTab === 'faq' && (
            <motion.div 
              key="faq-screen"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="max-w-3xl w-full text-left space-y-8"
              id="faq-accordion-portal"
            >
              <div className="text-center space-y-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight uppercase text-white">FREQUENTLY ASKED INTEGRITY LOGS</h2>
                <p className="text-xs text-zinc-400 uppercase font-mono tracking-wider">Expand accordion matrices below for operational clarity</p>
              </div>

              {/* FAQ Search Bar input */}
              <div className="relative max-w-md mx-auto">
                <input 
                  type="text"
                  placeholder="Query system rule details..."
                  value={faqCriteria}
                  onChange={(e) => setFaqCriteria(e.target.value)}
                  className="input-field w-full text-xs pl-10 pr-4 py-3 placeholder:text-zinc-500 bg-[#090f1d] border border-white/5 shadow-2xl"
                  id="faq-search-criteria"
                />
                <Search size={14} className="text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>

              <div className="space-y-4">
                {filteredFaqList.length > 0 ? (
                  filteredFaqList.map((item, idx) => (
                    <div 
                      key={idx}
                      className="glass-card border border-white/5 overflow-hidden transition-all duration-300"
                    >
                      <button 
                        onClick={() => handleToggleFaqIndex(idx)}
                        className="w-full p-5 text-left flex justify-between items-center gap-4 transition-colors hover:bg-white/[0.02] cursor-pointer"
                      >
                        <h3 className="font-extrabold uppercase text-xs sm:text-sm tracking-wide text-white/95">
                          {item.q}
                        </h3>
                        <ChevronDown 
                          size={16} 
                          className={`text-zinc-400 transition-transform duration-300 ${openedFaqIndices[idx] ? 'rotate-180 text-cyan-400' : ''}`} 
                        />
                      </button>

                      <AnimatePresence>
                        {openedFaqIndices[idx] && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden border-t border-white/5"
                          >
                            <div className="p-5 text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans bg-[#050a14]">
                              {item.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 text-zinc-500 text-xs uppercase tracking-wider font-mono">
                    Zero matched security query lines detected.
                  </div>
                )}
              </div>

              {/* ====================================================
                  PREMIUM ABOUT DEVELOPER (SURAJ RAWAT) - INSIDE FAQ
                  ==================================================== */}
              <div className="pt-12 border-t border-white/5 space-y-6">
                <div className="text-center">
                  <span className="bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-mono tracking-widest uppercase px-3 py-1 rounded-full col-span-full">
                    MEET THE ARCHITECT
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-1 uppercase">DEVELOPER PROFILE</h2>
                </div>

                <motion.div 
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="glass-card max-w-2xl w-full mx-auto p-8 sm:p-12 border border-cyan-500/15 relative overflow-hidden glow-border text-center shadow-[0_0_50px_rgba(6,182,212,0.05)]"
                >
                  {/* Absolute Glowing Halos */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/10 to-transparent blur-[80px]" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-500/10 to-transparent blur-[80px]" />
                  
                  {/* Decorative corners */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-cyan-500/30 rounded-tl-xl" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-purple-500/30 rounded-br-xl" />

                  <div className="space-y-6 relative z-10">
                    <div className="space-y-3">
                      <span className="bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-mono tracking-widest uppercase px-3.5 py-1 rounded-full inline-block">
                        FULL STACK DEVELOPER
                      </span>
                      <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white uppercase font-sans">
                        Suraj Rawat
                      </h3>
                      <p className="text-xs text-purple-400 font-mono uppercase tracking-wider">
                        BCA student | Graphic Era Hill University, Haldwani
                      </p>
                    </div>

                    <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-xl mx-auto font-sans font-medium">
                      Passionate about building modern responsive web applications with professional UX, clean secure codes, and high performance.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 pt-2">
                      <a 
                        href="https://github.com/SurajRawatr07" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center gap-2 text-xs text-zinc-300 hover:text-white bg-white/5 border border-white/10 px-4 py-2.5 rounded-xl transition-all duration-200 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:-translate-y-0.5 cursor-pointer"
                      >
                        <Github size={14} className="text-white" /> GitHub <ExternalLink size={10} className="opacity-40" />
                      </a>
                      <a 
                        href="https://www.linkedin.com/in/suraj-rawat-30513b340" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center gap-2 text-xs text-zinc-300 hover:text-white bg-white/5 border border-white/10 px-4 py-2.5 rounded-xl transition-all duration-200 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:-translate-y-0.5 cursor-pointer"
                      >
                        <Linkedin size={14} className="text-cyan-400" /> LinkedIn <ExternalLink size={10} className="opacity-40" />
                      </a>
                      <a 
                        href="https://instagram.com/surajrawat07" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center gap-2 text-xs text-zinc-300 hover:text-white bg-white/5 border border-white/10 px-4 py-2.5 rounded-xl transition-all duration-200 hover:border-purple-400 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:-translate-y-0.5 cursor-pointer"
                      >
                        <Instagram size={14} className="text-pink-400" /> Instagram <ExternalLink size={10} className="opacity-40" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ====================================================
          4. FLOATING MOBILE-APP STYLE GLASS NAVIGATION
          ==================================================== */}
      <div 
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[92%] max-w-sm transition-all duration-300 no-print
          ${scrolledNavVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
      >
        <div className="bg-[#040812f2] border border-white/10 backdrop-blur-2xl rounded-full px-2.5 py-2 flex justify-between items-center shadow-[0_4px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(6,182,212,0.1)] relative">
          
          {/* Active bottom slider background pill */}
          <div 
            className="absolute h-[80%] rounded-full bg-gradient-to-r from-cyan-500/15 to-purple-600/15 border border-cyan-400/20 transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.15)] pointer-events-none"
            style={{
              width: '30%',
              left: activeTab === 'home' ? '2.5%' : activeTab === 'exam' ? '35%' : '67.5%'
            }}
          />

          <button 
            onClick={() => {
              synthSvc.playClick();
              setActiveTab('home');
            }}
            className={`w-[30%] py-1.5 text-center rounded-full font-mono text-[10px] font-bold uppercase tracking-wider transition-all duration-200 flex flex-col items-center gap-1 cursor-pointer relative z-10 hover:scale-105 active:scale-95
              ${activeTab === 'home' ? 'text-cyan-400 font-black' : 'text-zinc-400 hover:text-white'}`}
            id="nav-tab-home-btn"
          >
            <Home 
              size={16} 
              className={`${activeTab === 'home' ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.85)] animate-bounce' : 'text-zinc-400 opacity-70'}`}
            />
            <span>HOME</span>
          </button>

          <button 
            onClick={() => {
              synthSvc.playClick();
              setActiveTab('exam');
            }}
            className={`w-[30%] py-1.5 text-center rounded-full font-mono text-[10px] font-bold uppercase tracking-wider transition-all duration-200 flex flex-col items-center gap-1 cursor-pointer relative z-10 hover:scale-105 active:scale-95
              ${activeTab === 'exam' ? 'text-purple-400 font-black' : 'text-zinc-400 hover:text-white'}`}
            id="nav-tab-exam-btn"
          >
            <ShieldCheck size={15} className={`${activeTab === 'exam' ? 'animate-bounce text-purple-400' : 'text-zinc-400'}`} />
            <span>EXAM</span>
          </button>

          <button 
            onClick={() => {
              synthSvc.playClick();
              setActiveTab('faq');
            }}
            className={`w-[30%] py-1.5 text-center rounded-full font-mono text-[10px] font-bold uppercase tracking-wider transition-all duration-200 flex flex-col items-center gap-1 cursor-pointer relative z-10 hover:scale-105 active:scale-95
              ${activeTab === 'faq' ? 'text-cyan-400 font-black' : 'text-zinc-400 hover:text-white'}`}
            id="nav-tab-faq-btn"
          >
            <MessageSquare size={15} className={`${activeTab === 'faq' ? 'animate-bounce text-cyan-400' : 'text-zinc-400'}`} />
            <span>FAQ</span>
          </button>
        </div>
      </div>

      {/* Modal: Secure Rules Dialog */}
      <AnimatePresence>
        {showHelpModal && (
          <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="glass-card p-6 sm:p-8 max-w-md w-full border border-cyan-500/30 text-left glow-border shadow-2xl relative"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-black uppercase text-white flex items-center gap-2">
                  <ShieldCheck size={20} className="text-cyan-400" /> SECURE CONSTRAINTS
                </h3>
                <button 
                  onClick={() => setShowHelpModal(false)}
                  className="p-1.5 hover:bg-white/5 rounded-lg text-zinc-400 hover:text-white cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-4 text-xs font-mono text-zinc-400 leading-relaxed">
                <div className="p-3 bg-[#08101e] border border-cyan-500/10 rounded-xl space-y-1">
                  <p className="text-cyan-400 font-bold uppercase mb-1">Passcodes Keys:</p>
                  <p>• Basic Computer: <span className="font-bold text-white selection:bg-purple-500/30">NSTECHBASIC</span></p>
                  <p>• Tally ERP: <span className="font-bold text-white selection:bg-purple-500/30">NSTECHTALLY</span></p>
                  <p>• Web Designing: <span className="font-bold text-white selection:bg-purple-500/30">NSTECHWEB</span></p>
                </div>

                <div className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center font-mono text-cyan-400 text-[10px] flex-shrink-0 font-bold">1</div>
                  <p>Input candidate Full Name for certificate credentialing.</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center font-mono text-cyan-400 text-[10px] flex-shrink-0 font-bold">2</div>
                  <p>Choose expertise course track and inject matching passcode verification key.</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center font-mono text-cyan-400 text-[10px] flex-shrink-0 font-bold">3</div>
                  <p>The system monitors active browser visibility bounds. Tab switching triggers alerts and eventually auto-submits score vectors.</p>
                </div>
              </div>

              <button 
                onClick={() => {
                  synthSvc.playClick();
                  setShowHelpModal(false);
                }}
                className="w-full mt-6 py-2.5 rounded-xl bg-cyan-500 text-black font-extrabold text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.3)]"
              >
                Accept Guardianship Parameters
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal: Anti-cheat Violation Alert Screen */}
      <AnimatePresence>
        {showViolationModal && (
          <div className="fixed inset-0 z-[140] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="glass-card p-6 sm:p-8 max-w-md w-full border border-rose-500/40 text-center glow-border shadow-[0_0_50px_rgba(239,68,68,0.3)] relative"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-rose-500 to-transparent animate-pulse" />
              
              <div className="w-16 h-16 bg-rose-500/10 text-rose-400 rounded-full flex items-center justify-center mx-auto mb-5 border border-rose-500/30 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
                <ShieldAlert size={32} className="animate-bounce" />
              </div>
              
              <h3 className="text-xl font-black uppercase text-white tracking-tight mb-2">
                Window Violation Detected
              </h3>
              
              <p className="text-sm text-zinc-300 leading-relaxed mb-6 font-sans">
                Your activity has been flagged. Switching windows is strictly prohibited and recorded.
              </p>

              <div className="bg-rose-500/5 border border-rose-500/20 rounded-xl p-4 mb-6">
                <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Active Violation Count</p>
                <p className="text-3xl font-mono font-black text-rose-500 mt-1">
                  {warnings} <span className="text-zinc-500 text-lg">/ 3</span>
                </p>
                <p className="text-[10px] text-zinc-500 font-mono mt-1 uppercase">Instant auto-submission occurs on the 3rd infraction.</p>
              </div>

              <button 
                onClick={() => {
                  synthSvc.playClick();
                  setShowViolationModal(false);
                }}
                className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs uppercase tracking-widest transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:shadow-[0_0_30px_rgba(239,68,68,0.6)]"
              >
                Acknowledge and Refocus Gaze
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal: Secure Submit decision */}
      <AnimatePresence>
        {showSubmitModal && (
          <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-card p-6 sm:p-8 max-w-sm w-full border border-rose-500/20 text-center glow-border"
            >
              <div className="w-12 h-12 bg-rose-500/10 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-rose-500/20">
                <AlertTriangle size={22} />
              </div>
              <h3 className="text-base font-black uppercase text-white mb-2">Finalize Grade Analysis?</h3>
              <p className="text-xs text-zinc-400 mb-6 leading-relaxed">Once submitted, accuracy calculations compile instantly and certificate locks trigger. Confirm transaction?</p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowSubmitModal(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 font-bold text-xs uppercase tracking-wider text-zinc-400 cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    setShowSubmitModal(false);
                    commenceScanningComputation();
                  }}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black text-xs uppercase tracking-wider shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  id="final-submission-modal-btn"
                >
                  Confirm Transmit
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal: Cinematic Welcome Popup before Exam Launches */}
      <AnimatePresence>
        {showWelcomePopup && (
          <div className="fixed inset-0 z-[140] flex items-center justify-center p-4 bg-black/95 backdrop-blur-lg no-select">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.4, cubicBezier: [0.16, 1, 0.3, 1] }}
              className="glass-card max-w-md w-full p-8 border border-cyan-500/40 text-center relative overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.25)] space-y-6"
            >
              {/* Corner accent decorations */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />
              
              {/* Floating micro-animated launch core */}
              <div className="relative w-20 h-20 mx-auto flex items-center justify-center bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border-2 border-cyan-400/40 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                <motion.div
                  className="absolute inset-0 border border-dotted border-cyan-400/50 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
                <Sparkles size={36} className="text-cyan-400 animate-pulse" />
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-mono font-black text-cyan-400 tracking-widest uppercase bg-cyan-500/15 border border-cyan-500/30 px-3 py-1 rounded-full">
                  COGNITIVE GATE PASSED
                </span>
                <h3 className="text-2xl font-black text-white tracking-wide uppercase font-serif py-1">
                  BEST OF LUCK, <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">{userData.name}</span>! 🚀
                </h3>
                <p className="text-xs font-mono text-zinc-400 leading-relaxed max-w-sm mx-auto">
                  Your secure environment session logs are validated. Browser containment and AI anti-cheat algorithms are now operational.
                </p>
              </div>

              <div className="p-4 bg-white/5 border border-white/5 rounded-2xl text-left space-y-2.5 font-mono text-[10px] text-zinc-300">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                  <span>TOTAL QUESTIONS: <strong className="text-white">20 ITEMS</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                  <span>ALLOCATED LIMITS: <strong className="text-white">15 MINUTES TOTAL</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                  <span>PROCTOR INFRACTIONS: <strong className="text-rose-400 font-bold">3 WARNING LIMITS</strong></span>
                </div>
              </div>

              <button
                onClick={() => {
                  synthSvc.playSwell();
                  setShowWelcomePopup(false);
                  setExamStep('quiz');
                  if (!document.fullscreenElement) {
                    document.documentElement.requestFullscreen().catch(() => {});
                  }
                  triggerInstantToast("Assessment launched. Content decrypted.", "success");
                }}
                className="w-full py-4.5 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 text-white font-extrabold text-xs uppercase tracking-widest transition-all hover:scale-[1.03] active:scale-[0.97] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] cursor-pointer select-none border-none outline-none"
              >
                Launch Assessment Matrix
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating System-wide chimes toasts */}
      <div className="fixed top-24 right-6 z-[150] space-y-3 pointer-events-none max-w-sm w-full">
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.9 }}
              className={`p-4 rounded-xl shadow-2xl flex items-center gap-3 backdrop-blur-md border border-white/10 pointer-events-auto
                ${toast.type === 'success' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 
                  toast.type === 'warning' ? 'bg-rose-500/20 text-rose-400 border-rose-500/30' : 
                  'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'}`}
            >
              <AlertCircle size={16} className="flex-shrink-0" />
              <span className="text-xs font-mono font-bold uppercase tracking-wide">{toast.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Subtle Minimal Footer copyright */}
      <footer className="w-full py-8 mt-16 text-center text-zinc-600 font-mono text-[10px] uppercase tracking-widest no-print select-none opacity-80 hover:opacity-100 transition-opacity duration-300">
        @2026 NS TECHNOLOGY ALL RIGHT RESERVED
      </footer>
    </div>
  );
}
