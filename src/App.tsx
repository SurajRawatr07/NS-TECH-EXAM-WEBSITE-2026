/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
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
  Github,
  ExternalLink,
  ChevronDown,
  Home
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { questions, Question } from './data/questions';

// High-fidelity sine oscillators for responsive audio feedback
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
      osc.frequency.setValueAtTime(540, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, this.ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
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
      osc.frequency.setValueAtTime(1000, this.ctx.currentTime);
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
      [0, 0.12].forEach(delay => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(300, t + delay);
        osc.frequency.linearRampToValueAtTime(150, t + delay + 0.1);
        gain.gain.setValueAtTime(0.05, t + delay);
        gain.gain.exponentialRampToValueAtTime(0.001, t + delay + 0.1);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t + delay);
        osc.stop(t + delay + 0.1);
      });
    } catch {}
  }

  playSuccess() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);
        gain.gain.setValueAtTime(0.04, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.22);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.25);
      });
    } catch {}
  }

  playSwell() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.exponentialRampToValueAtTime(520, now + 0.35);
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.4);
    } catch {}
  }

  playHeartbeat() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(55, now);
      osc1.frequency.exponentialRampToValueAtTime(10, now + 0.12);
      gain1.gain.setValueAtTime(0.16, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.12);
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
  "Focus Mode Active",
  "Great Progress",
  "Keep Going",
  "Secure Link Encrypted",
  "You're Doing Well",
  "Process Stable",
  "Maintain Concentration"
];

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [examStep, setExamStep] = useState<ExamStep>('gate');
  
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
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const [isDrumrollActive, setIsDrumrollActive] = useState(false);
  
  const [isResumingExam, setIsResumingExam] = useState(false);
  const [isPortrait, setIsPortrait] = useState(true);
  const [randomizedQuestionsList, setRandomizedQuestionsList] = useState<Question[]>([]);
  const [antiCheatFlashActive, setAntiCheatFlashActive] = useState(false);
  
  const [scanningProgress, setScanningProgress] = useState(0);
  const [scanningStatus, setScanningStatus] = useState('Verifying responses...');

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const totalTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Dynamic Questions selection conforming to current selected track
  const currentExamQuestions = useMemo(() => {
    return randomizedQuestionsList.length > 0 ? randomizedQuestionsList : questions[userData.course];
  }, [randomizedQuestionsList, userData.course]);

  // Interactive Question Shuffle based on Difficulty and sequence
  const generateRandomShuffledSyllabus = (trackName: keyof typeof questions) => {
    const allQuestions = [...questions[trackName]];
    const easyQs = allQuestions.filter(q => q.difficulty === 'easy');
    const mediumQs = allQuestions.filter(q => q.difficulty === 'medium');
    const hardQs = allQuestions.filter(q => q.difficulty === 'hard');
    
    const shuffleArray = <T,>(arr: T[]): T[] => {
      const shuffled = [...arr];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };
    
    const combinedList = [...shuffleArray(easyQs), ...shuffleArray(mediumQs), ...shuffleArray(hardQs)];
    
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

  useEffect(() => {
    synthSvc.enabled = soundToggle;
  }, [soundToggle]);

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
          triggerInstantToast('Exam auto-submitted due to window deviations', 'warning');
        } else {
          setShowViolationModal(true);
        }
      }
    };
    document.addEventListener('visibilitychange', blockTabSwitches);
    return () => document.removeEventListener('visibilitychange', blockTabSwitches);
  }, [activeTab, examStep, warnings]);

  // Mouse bounds check
  useEffect(() => {
    const handleBoundsGuard = () => {
      if (activeTab === 'exam' && examStep === 'quiz') {
        synthSvc.playAlert();
        triggerInstantToast("Security Alert: Please keep focus inside the portal window", "warning");
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
        triggerInstantToast("Shortcut restricted by exam monitor", "warning");
      }
    };
    window.addEventListener('keydown', blockDevInput);
    return () => window.removeEventListener('keydown', blockDevInput);
  }, []);

  // Block context menu and copy
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
    setToasts(prev => [...prev.slice(-2), { id, message, type }]);
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

  // Session storage restore
  useEffect(() => {
    const cachedObject = localStorage.getItem('nst_assessment_key_v2');
    if (cachedObject) {
      try {
        const payload = JSON.parse(cachedObject);
        if (payload.activeTab === 'exam' && payload.examStep === 'quiz') {
          setIsResumingExam(true);
        }
      } catch {}
    }
  }, []);

  const initRestoredSession = () => {
    const cachedObject = localStorage.getItem('nst_assessment_key_v2');
    if (cachedObject) {
      try {
        const { userData: restoredUser, answers: restoredAnswers, currentQuestionIndex: restoredIndex, randomizedQuestionsList: restoredQ } = JSON.parse(cachedObject);
        setUserData(restoredUser);
        setAnswers(restoredAnswers);
        setCurrentQuestionIndex(restoredIndex);
        setRandomizedQuestionsList(restoredQ);
        setActiveTab('exam');
        setExamStep('quiz');
        setIsResumingExam(false);
        synthSvc.playSuccess();
        triggerInstantToast("Session restored successfully", "success");
      } catch {}
    }
  };

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

  // Question timer
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
      triggerInstantToast("Time expired on current question. Advancing...", "warning");
      triggerProceedNext();
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activeTab, examStep, questionTimeLeft]);

  const EXAM_TOTAL_LIMIT_SEC = 900; // 15 minutes max
  const examTotalTimeLeft = Math.max(0, EXAM_TOTAL_LIMIT_SEC - totalTimeTaken);
  const isTimerPressureActive = activeTab === 'exam' && examStep === 'quiz' && examTotalTimeLeft <= 300;

  useEffect(() => {
    if (activeTab === 'exam' && examStep === 'quiz' && examTotalTimeLeft <= 0) {
      synthSvc.playAlert();
      triggerInstantToast("Exam time expired. Submitting responses...", "warning");
      commenceScanningComputation();
    }
  }, [examTotalTimeLeft, activeTab, examStep]);

  useEffect(() => {
    if (activeTab === 'exam' && examStep === 'quiz') {
      totalTimerRef.current = setInterval(() => {
        setTotalTimeTaken(prev => {
          const nextVal = prev + 1;
          const timeLeft = EXAM_TOTAL_LIMIT_SEC - nextVal;
          if (timeLeft <= 300 && timeLeft > 0) {
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

  const processSecureExamEntry = (e: React.FormEvent) => {
    e.preventDefault();
    const correctCerts: Record<string, string> = {
      'Web Designing': 'NSTECHWEB',
      'Tally': 'NSTECHTALLY',
      'Basic Computer': 'NSTECHBASIC'
    };

    if (userData.password !== correctCerts[userData.course]) {
      synthSvc.playAlert();
      triggerInstantToast("Verification failed: passcode is invalid", "warning");
      return;
    }

    if (userData.name.trim()) {
      synthSvc.playSwell();
      generateRandomShuffledSyllabus(userData.course);
      
      setQuestionTimeLeft(60);
      setTotalTimeTaken(0);
      setCurrentQuestionIndex(0);
      setAnswers({});
      setWarnings(0);
      
      setShowWelcomePopup(true);
      triggerInstantToast(`Credentials verified for ${userData.name}`, "success");
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

  const handleDownloadResultCard = () => {
    synthSvc.playClick();
    try {
      const accuracyText = (score / currentExamQuestions.length * 100).toFixed(1);
      const svgContent = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920" width="1080" height="1920" style="background: #fdfaf4; font-family: 'Fraunces', serif;">
          <rect x="40" y="40" width="1000" height="1840" rx="24" fill="#ffffff" stroke="#e2dbcd" stroke-width="3"/>
          <text x="540" y="240" font-size="28" fill="#64748b" font-weight="700" letter-spacing="2" text-anchor="middle" font-family="'Outfit', sans-serif">NS TECHNOLOGY ASSESSMENT</text>
          <text x="540" y="440" font-size="46" fill="#1a2744" font-weight="700" text-anchor="middle">Official Exam Transcript</text>
          <line x1="200" y1="500" x2="880" y2="500" stroke="#e2dbcd" stroke-width="2"/>
          <text x="540" y="620" font-size="22" fill="#64748b" text-anchor="middle" font-family="'Outfit', sans-serif">CANDIDATE</text>
          <text x="540" y="680" font-size="42" fill="#1a2744" font-weight="700" text-anchor="middle">${userData.name || 'Student'}</text>
          <text x="540" y="800" font-size="22" fill="#64748b" text-anchor="middle" font-family="'Outfit', sans-serif">COURSE</text>
          <text x="540" y="860" font-size="36" fill="#b45309" font-weight="700" text-anchor="middle">${userData.course}</text>
          <rect x="240" y="980" width="600" height="240" rx="20" fill="#fdfaf4" stroke="#b45309" stroke-width="2"/>
          <text x="540" y="1110" font-size="72" fill="#1a2744" font-weight="700" text-anchor="middle">${accuracyText}%</text>
          <text x="540" y="1170" font-size="20" fill="#64748b" text-anchor="middle" font-family="'Outfit', sans-serif">Verified Score Accuracy</text>
          <text x="540" y="1380" font-size="22" fill="#64748b" text-anchor="middle" font-family="'Outfit', sans-serif">Certificate ID: ${certificateId}</text>
          <text x="540" y="1430" font-size="20" fill="#b45309" text-anchor="middle" font-family="'Outfit', sans-serif">Status: Verified & Completed</text>
          <text x="540" y="1720" font-size="20" fill="#64748b" text-anchor="middle" font-family="'Outfit', sans-serif">© 2026 NS Technology • All Rights Reserved</text>
        </svg>
      `;
      const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `NS_TECH_RESULT_${(userData.name || 'STUDENT').toUpperCase().replace(/\s+/g, '_')}.svg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      triggerInstantToast("Result transcript exported successfully", "success");
    } catch(err) {
      triggerInstantToast("Snapshot generation failed", "warning");
    }
  };

  const commenceScanningComputation = () => {
    synthSvc.playSwell();
    setExamStep('scanning');
    setScanningProgress(0);
    
    let count = 0;
    const scanInterval = setInterval(() => {
      count += Math.floor(Math.random() * 14) + 6;
      if (count >= 100) {
        count = 100;
        clearInterval(scanInterval);
        
        let finalTalliedScore = 0;
        currentExamQuestions.forEach((item, index) => {
          if (answers[index] === item.answer) {
            finalTalliedScore++;
          }
        });
        
        setScore(finalTalliedScore);
        setExamStep('result');
        setIsDrumrollActive(true);
        
        let tickTimes = 0;
        const drumInterval = setInterval(() => {
          synthSvc.playTick();
          tickTimes++;
          if (tickTimes >= 10) {
            clearInterval(drumInterval);
          }
        }, 120);

        setTimeout(() => {
          setIsDrumrollActive(false);
          triggerInstantToast("Results evaluated successfully", "success");
          
          confetti({
            particleCount: 100,
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#171717', '#b45309', '#e2dbcd', '#1a2744']
          });

          synthSvc.playSuccess();
        }, 1200);
      }
      setScanningProgress(count);
      if (count < 35) {
        setScanningStatus('Transmitting responses to validation system...');
      } else if (count < 70) {
        setScanningStatus('Auditing session integrity logs...');
      } else if (count < 95) {
        setScanningStatus('Computing score and accuracy...');
      } else {
        setScanningStatus('Evaluation complete');
      }
    }, 120);
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

  useEffect(() => {
    if (examStep === 'result') {
      let runTracker = 0;
      const targetScore = score;
      if (runTracker === targetScore) {
        setAnimatedScore(targetScore);
        return;
      }
      const animRate = Math.max(1, targetScore / 25);
      const clock = setInterval(() => {
        runTracker += animRate;
        if (runTracker >= targetScore) {
          setAnimatedScore(targetScore);
          clearInterval(clock);
        } else {
          setAnimatedScore(Math.floor(runTracker));
        }
      }, 25);
      return () => clearInterval(clock);
    } else {
      setAnimatedScore(0);
    }
  }, [examStep, score]);

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
      return "Great Progress";
    } else if (progressPercent <= 60) {
      return "Keep Going";
    } else if (progressPercent <= 80) {
      return "Excellent Accuracy";
    } else {
      return "Success is Near";
    }
  }, [answers, currentExamQuestions]);

  const percentageGradeRatio = (score / currentExamQuestions.length) * 100;
  const isSufficientlyPassed = percentageGradeRatio >= 40;

  const performance = useMemo(() => {
    const pct = percentageGradeRatio;
    if (pct >= 90) {
      return {
        rank: 'Elite Specialist',
        msg: 'Distinction Authorized',
        color: 'text-[var(--accent)]'
      };
    } else if (pct >= 60) {
      return {
        rank: 'Qualified Operator',
        msg: 'Pass Standard Attained',
        color: 'text-[var(--accent)]'
      };
    } else {
      return {
        rank: 'Aspirant',
        msg: 'Calibration Required',
        color: 'text-[var(--error)]'
      };
    }
  }, [percentageGradeRatio]);

  const customAIProcText = useMemo(() => {
    const accuracy = percentageGradeRatio;
    let comment = '';
    if (accuracy >= 90) {
      comment = `Proctor validation scores your performance at elite levels. Your response speed coefficients suggest excellent mastery over '${userData.course}' fundamentals. Minimal security variances detected. Certified high-tier credentials authorized for generation.`;
    } else if (accuracy >= 65) {
      comment = `Adequate cognitive response profile established. The system noted strong correct chains in several consecutive milestones. Some knowledge limits indicated in challenging structures. Security compliance parameters remain stable.`;
    } else if (accuracy >= 40) {
      comment = `Minimum baseline criteria achieved. Focus profiles suggest moderate core knowledge with variance in processing. Further training cycles highly suggested in specific areas of '${userData.course}'.`;
    } else {
      comment = `Syllabus minimum threshold not completed during this cycle. System log advises extensive review over '${userData.course}' modules. Cognitive answers showed confusion patterns. Recalibration strongly advised.`;
    }
    return comment;
  }, [percentageGradeRatio, userData.course]);

  // Interactive FAQ query management
  const [faqCriteria, setFaqCriteria] = useState('');
  const [openedFaqIndices, setOpenedFaqIndices] = useState<Record<number, boolean>>({ 0: true });

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

  const hudPrompt = useMemo(() => {
    return MOTIVATIONAL_HUD_PROMPTS[currentQuestionIndex % MOTIVATIONAL_HUD_PROMPTS.length];
  }, [currentQuestionIndex]);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] overflow-x-hidden select-none relative pb-28 md:pb-28">
      {/* Timer Pressure Alert Banner */}
      {isTimerPressureActive && (
        <div className="fixed top-14 inset-x-0 z-30 bg-[var(--error)] text-white px-4 py-2 text-center text-xs font-bold flex items-center justify-center gap-2 shadow-sm">
          <AlertCircle size={15} />
          <span>Less than 5 minutes remaining in this examination session.</span>
        </div>
      )}

      {/* Anti-cheat Flash Guard */}
      {antiCheatFlashActive && (
        <div className="fixed inset-0 z-[1000] bg-[var(--error)]/90 text-white pointer-events-none transition-opacity duration-150 flex items-center justify-center">
          <div className="text-center">
            <ShieldAlert size={56} className="mx-auto mb-3" />
            <p className="text-lg font-bold">Restricted Shortcut Inbound</p>
          </div>
        </div>
      )}

      {/* Orientation Warning */}
      {!isPortrait && (
        <div className="fixed inset-0 bg-[var(--background)] z-[999] flex flex-col items-center justify-center text-center p-8">
          <Smartphone size={44} className="text-[var(--primary)] mb-4" />
          <h2 className="text-lg font-bold text-[var(--foreground)] mb-2">Refit Device Alignment</h2>
          <p className="text-xs text-[var(--muted-foreground)] max-w-xs">Examination safety frameworks require portrait orientation on mobile screens.</p>
        </div>
      )}

      {/* Recover Session Modal */}
      <AnimatePresence>
        {isResumingExam && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.12 }}
              className="bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius)] p-6 max-w-sm w-full text-center shadow-md"
            >
              <div className="w-12 h-12 bg-[var(--muted)] text-[var(--primary)] rounded-full flex items-center justify-center mx-auto mb-3">
                <RotateCcw size={22} />
              </div>
              <h3 className="text-base font-bold text-[var(--foreground)] mb-1">Restore Backup Exam?</h3>
              <p className="text-xs text-[var(--muted-foreground)] mb-5 leading-relaxed">An unfinished session was detected. Would you like to resume your current exam context?</p>
              <div className="flex gap-2.5">
                <button 
                  onClick={() => {
                    localStorage.removeItem('nst_assessment_key_v2');
                    setIsResumingExam(false);
                    triggerInstantToast("Previous session discarded", "info");
                  }}
                  className="btn-secondary flex-1 py-2 text-xs cursor-pointer"
                >
                  Discard
                </button>
                <button 
                  onClick={initRestoredSession}
                  className="btn-primary flex-1 py-2 text-xs cursor-pointer"
                >
                  Restore
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Slim, Sticky Top Header: logo + "NS TECHNOLOGY" only, background --background, bottom border --border */}
      <header className="sticky top-0 left-0 right-0 z-40 bg-[var(--background)]/90 backdrop-blur-sm border-b border-[var(--border)] px-4 sm:px-6 py-3 flex items-center justify-between no-print shadow-none">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-[var(--radius)] bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white shrink-0">
            <Cpu size={15} />
          </div>
          <span className="text-sm font-semibold tracking-[0.02em] text-[var(--foreground)] uppercase whitespace-nowrap">
            NS TECHNOLOGY
          </span>
        </div>

        {/* Status in quiz */}
        {activeTab === 'exam' && examStep === 'quiz' && (
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-[var(--radius)] bg-[var(--secondary)] border border-[var(--border)] text-xs font-semibold">
            <span className="text-[var(--muted-foreground)] truncate max-w-[90px] sm:max-w-none">{userData.name}</span>
            <span className="text-[var(--border)]">·</span>
            <span className="text-[var(--accent)] font-mono tabular-nums">{calculateRemainingSecondsTime(totalTimeTaken)}</span>
          </div>
        )}

        <div className="flex items-center gap-1.5">
          <button 
            onClick={() => setSoundToggle(!soundToggle)}
            className="p-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] rounded-[var(--radius)] hover:bg-[var(--secondary)] transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
            title="Toggle Sound Effects"
            aria-label="Toggle Sound Effects"
          >
            {soundToggle ? <Volume2 size={17} /> : <VolumeX size={17} />}
          </button>
        </div>
      </header>

      {/* Main Content Area with Instant App-Like Page Switching (max 150ms fade) */}
      <main className="pt-6 sm:pt-10 px-4 max-w-3xl mx-auto w-full flex flex-col items-center">
        <AnimatePresence mode="wait">
          {/* ====================================================
              1. HOME PAGE
              ==================================================== */}
          {activeTab === 'home' && (
            <motion.div 
              key="home-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12 }}
              className="w-full space-y-6 text-center"
            >
              {/* Project Era Hero Card */}
              <div className="crimson-card p-6 sm:p-10 space-y-6 text-center">
                <div className="space-y-3">
                  <div className="badge-accent">
                    <span>Advanced Assessment Platform</span>
                  </div>

                  <h1 className="text-[clamp(1.75rem,5vw,2.75rem)] font-bold text-[var(--foreground)] leading-tight tracking-tight">
                    NS Technology <span className="text-[var(--accent)] font-serif">Exam Portal</span>
                  </h1>

                  <p className="text-[12px] text-[var(--muted-foreground)] font-semibold tracking-[0.03em] uppercase">
                    Secure • Intelligent • Online Examination Experience
                  </p>
                </div>

                <p className="max-w-xl mx-auto text-[15px] text-[var(--foreground)]/85 leading-[1.6]">
                  A modern AI-powered examination platform with secure assessments, smart analytics, anti-cheat protection, and seamless user experience.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-2">
                  <button 
                    onClick={() => {
                      synthSvc.playClick();
                      setActiveTab('exam');
                      setExamStep('gate');
                    }}
                    className="btn-primary w-full sm:w-auto px-6 py-2.5 cursor-pointer min-h-[44px]"
                    id="cta-start-exam"
                  >
                    Start Exam <Zap size={15} />
                  </button>
                  <button 
                    onClick={() => {
                      synthSvc.playClick();
                      setActiveTab('faq');
                    }}
                    className="btn-secondary w-full sm:w-auto px-6 py-2.5 cursor-pointer min-h-[44px]"
                    id="cta-explore-portal"
                  >
                    Explore Portal <ChevronRight size={15} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ====================================================
              2. EXAM MODULE
              ==================================================== */}
          {activeTab === 'exam' && (
            <motion.div 
              key="exam-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12 }}
              className="w-full"
            >
              {/* Step: Gate Authentication */}
              {examStep === 'gate' && (
                <div className="max-w-md w-full mx-auto">
                  <div className="crimson-card p-6 sm:p-8 text-center space-y-5">
                    <div className="space-y-2">
                      <div className="w-12 h-12 rounded-[var(--radius)] bg-[var(--secondary)] border border-[var(--border)] text-[var(--accent)] flex items-center justify-center mx-auto mb-2">
                        <Lock size={20} />
                      </div>
                      <h2 className="text-[clamp(1.1rem,3vw,1.4rem)] font-bold text-[var(--foreground)]">
                        Secure Assessment Gateway
                      </h2>
                      <p className="text-[13px] text-[var(--muted-foreground)] max-w-xs mx-auto">
                        Input registration credentials to authorize and launch the evaluation matrix.
                      </p>
                    </div>

                    <form onSubmit={processSecureExamEntry} className="space-y-4 text-left">
                      <div className="space-y-1">
                        <label className="crimson-label uppercase flex items-center gap-1.5">
                          <User size={12} className="text-[var(--accent)]" /> Examinee Full Name
                        </label>
                        <input 
                          type="text"
                          required
                          placeholder="e.g. Suraj Rawat"
                          value={userData.name}
                          onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                          className="crimson-input w-full"
                          id="name-credential-field"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="crimson-label uppercase flex items-center gap-1.5">
                          <BookOpen size={12} className="text-[var(--accent)]" /> Academic Syllabus Path
                        </label>
                        <div className="relative">
                          <select 
                            value={userData.course}
                            onChange={(e) => setUserData(prev => ({ ...prev, course: e.target.value as any }))}
                            className="crimson-input w-full appearance-none pr-9 cursor-pointer"
                          >
                            <option value="Basic Computer">Basic Computer (NSTECHBASIC)</option>
                            <option value="Tally">Tally ERP / Prime (NSTECHTALLY)</option>
                            <option value="Web Designing">Web Designing (NSTECHWEB)</option>
                          </select>
                          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] pointer-events-none" />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="crimson-label uppercase flex items-center gap-1.5">
                          <Lock size={12} className="text-[var(--accent)]" /> Secure Gate Verification Key
                        </label>
                        <div className="relative">
                          <input 
                            type={showPassword ? "text" : "password"}
                            required
                            placeholder="Input verification passcode"
                            value={userData.password}
                            onChange={(e) => setUserData(prev => ({ ...prev, password: e.target.value }))}
                            className="crimson-input w-full pr-10 font-mono"
                            id="passcode-credential-field"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              synthSvc.playClick();
                              setShowPassword(!showPassword);
                            }}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] p-1.5"
                            title={showPassword ? "Mask Passcode" : "Unmask Passcode"}
                            aria-label={showPassword ? "Mask Passcode" : "Unmask Passcode"}
                          >
                            {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                          </button>
                        </div>
                      </div>

                      <button 
                        type="submit"
                        className="btn-primary w-full mt-2 py-2.5 cursor-pointer min-h-[44px]"
                        id="form-secure-auth-btn"
                      >
                        Validate Secure Key <ChevronRight size={15} />
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {/* Step: Quiz Screen (Single column on mobile, sticky timer, large options) */}
              {examStep === 'quiz' && (
                <div className="w-full space-y-4 text-left">
                  {/* Sticky Timer Bar */}
                  <div className="sticky top-14 z-30 bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius)] p-3 flex items-center justify-between shadow-xs">
                    <div className="flex items-center gap-3">
                      <div className={`px-2.5 py-1 rounded-[var(--radius)] text-xs font-mono font-bold flex items-center gap-1.5 tabular-nums border
                        ${questionTimeLeft <= 15 ? 'bg-[var(--error)] text-white border-[var(--error)]' : 'bg-[var(--secondary)] text-[var(--accent)] border-[var(--border)]'}`}
                      >
                        <Timer size={13} />
                        <span>{questionTimeLeft}s</span>
                      </div>
                      
                      <span className="text-xs font-semibold text-[var(--foreground)]">
                        Question {currentQuestionIndex + 1} of {currentExamQuestions.length}
                      </span>
                    </div>

                    <span className="text-[12px] text-[var(--muted-foreground)] font-semibold px-2 py-0.5 rounded-[var(--radius)] bg-[var(--secondary)] border border-[var(--border)] hidden sm:inline-block">
                      {hudPrompt}
                    </span>
                  </div>

                  {/* Main Single-Column Question Layout */}
                  <div className="crimson-card p-5 sm:p-7 relative overflow-hidden flex flex-col justify-between min-h-[340px]">
                    {/* Top Progress Line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--secondary)]">
                      <div 
                        className="h-full bg-[var(--accent)] transition-all duration-200"
                        style={{ width: `${((currentQuestionIndex + 1) / currentExamQuestions.length) * 100}%` }}
                      />
                    </div>

                    <div className="space-y-4 pt-1">
                      <div className="text-[12px] font-semibold text-[var(--accent)] flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                        <span>{motivationalAIMessage}</span>
                      </div>

                      <h2 className="text-base sm:text-lg font-bold text-[var(--foreground)] leading-relaxed">
                        {currentExamQuestions[currentQuestionIndex].question}
                      </h2>

                      {/* Large Tappable Options (min 48px) */}
                      <div className="grid grid-cols-1 gap-2.5 pt-1">
                        {currentExamQuestions[currentQuestionIndex].options.map((option, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSelectResponse(option)}
                            className={`w-full p-3.5 sm:p-4 rounded-[var(--radius)] border text-left text-[15px] font-medium flex items-center gap-3 transition-colors cursor-pointer min-h-[48px]
                              ${answers[currentQuestionIndex] === option 
                                ? 'bg-[var(--accent-light)] border-[var(--accent)] text-[var(--foreground)] font-semibold shadow-xs' 
                                : 'bg-[var(--card)] border-[var(--border)] hover:border-[#cbd5e1] text-[var(--foreground)]'}`}
                          >
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors
                              ${answers[currentQuestionIndex] === option ? 'border-[var(--accent)] bg-[var(--accent)]' : 'border-[var(--muted-foreground)]'}`}>
                              {answers[currentQuestionIndex] === option && (
                                <div className="w-1.5 h-1.5 bg-white rounded-full" />
                              )}
                            </div>
                            <span className="flex-1 leading-snug">{option}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Desktop Inline Actions */}
                    <div className="hidden sm:flex items-center justify-between pt-5 mt-5 border-t border-[var(--border)]">
                      <button 
                        disabled={currentQuestionIndex === 0}
                        onClick={triggerProceedPrevious}
                        className="btn-secondary py-2 px-4 text-xs disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                      >
                        <ChevronLeft size={14} /> Previous
                      </button>

                      <button 
                        onClick={triggerProceedNext}
                        className="btn-primary py-2 px-5 text-xs cursor-pointer"
                      >
                        {currentQuestionIndex === currentExamQuestions.length - 1 ? 'Submit Exam' : 'Next'} <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Sticky Mobile Next/Submit Action Bar above the bottom tab bar */}
                  <div className="sm:hidden sticky bottom-16 z-30 bg-[var(--background)] border-t border-[var(--border)] p-3 -mx-4 flex items-center justify-between gap-3 shadow-xs">
                    <button 
                      disabled={currentQuestionIndex === 0}
                      onClick={triggerProceedPrevious}
                      className="btn-secondary flex-1 py-2.5 text-xs disabled:opacity-40 min-h-[44px]"
                    >
                      <ChevronLeft size={14} /> Previous
                    </button>
                    <button 
                      onClick={triggerProceedNext}
                      className="btn-primary flex-1 py-2.5 text-xs min-h-[44px]"
                    >
                      {currentQuestionIndex === currentExamQuestions.length - 1 ? 'Submit Exam' : 'Next'} <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              )}

              {/* Step: Review Metrics */}
              {examStep === 'review' && (
                <div className="max-w-2xl w-full mx-auto text-left">
                  <div className="crimson-card p-6 sm:p-8 space-y-6">
                    <div className="text-center space-y-1">
                      <h2 className="text-[clamp(1.1rem,3vw,1.4rem)] font-bold text-[var(--foreground)]">
                        Cognitive Review Ledger
                      </h2>
                      <p className="text-xs text-[var(--muted-foreground)]">Confirm correct answer allocations before compiling grade metrics.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-center">
                      <div className="bg-[var(--secondary)]/60 border border-[var(--border)] p-3.5 rounded-[var(--radius)]">
                        <span className="text-[12px] text-[var(--muted-foreground)] font-semibold uppercase tracking-[0.03em] block">Responses Encoded</span>
                        <p className="text-2xl font-bold text-[var(--accent)] font-mono mt-1">
                          {Object.keys(answers).length}
                        </p>
                      </div>
                      <div className="bg-[var(--secondary)]/60 border border-[var(--border)] p-3.5 rounded-[var(--radius)]">
                        <span className="text-[12px] text-[var(--muted-foreground)] font-semibold uppercase tracking-[0.03em] block">Pending Tasks</span>
                        <p className="text-2xl font-bold text-[var(--error)] font-mono mt-1">
                          {currentExamQuestions.length - Object.keys(answers).length}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 max-w-lg mx-auto">
                      {currentExamQuestions.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            synthSvc.playClick();
                            setCurrentQuestionIndex(idx);
                            setExamStep('quiz');
                            setQuestionTimeLeft(60);
                          }}
                          className={`h-9 rounded-[var(--radius)] flex items-center justify-center font-mono text-xs font-bold transition-colors cursor-pointer border
                            ${answers[idx] ? 'bg-neutral-900 border-neutral-900 text-white' : 'bg-[var(--card)] border-[var(--border)] text-[var(--muted-foreground)] hover:border-[#cbd5e1]'}`}
                        >
                          {idx + 1}
                        </button>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2.5 justify-center pt-2">
                      <button 
                        onClick={() => {
                          synthSvc.playClick();
                          setCurrentQuestionIndex(0);
                          setExamStep('quiz');
                          setQuestionTimeLeft(60);
                        }}
                        className="btn-secondary py-2.5 px-4 text-xs cursor-pointer min-h-[44px]"
                      >
                        <ChevronLeft size={14} /> Returns to Canvas
                      </button>
                      <button 
                        onClick={() => {
                          const unanswered = currentExamQuestions.length - Object.keys(answers).length;
                          if (unanswered > 0) {
                            synthSvc.playAlert();
                            triggerInstantToast(`Notice: You have ${unanswered} answers unencoded`, "warning");
                          }
                          setShowSubmitModal(true);
                        }}
                        className="btn-primary py-2.5 px-5 text-xs cursor-pointer min-h-[44px]"
                      >
                        Transmit Final Submission <CheckCircle2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Step: Scanning Screen */}
              {examStep === 'scanning' && (
                <div className="max-w-md w-full mx-auto">
                  <div className="crimson-card p-6 sm:p-8 text-center space-y-6">
                    <div className="w-12 h-12 rounded-[var(--radius)] bg-[var(--secondary)] border border-[var(--border)] text-[var(--accent)] flex items-center justify-center mx-auto">
                      <Cpu size={22} className="animate-pulse" />
                    </div>
                    <div className="space-y-1">
                      <h2 className="text-base font-bold text-[var(--foreground)]">Compiling Cognitive Marks</h2>
                      <p className="text-xs text-[var(--muted-foreground)]">{scanningStatus}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="h-2 w-full bg-[var(--secondary)] rounded-[var(--radius)] overflow-hidden">
                        <div 
                          className="h-full bg-[var(--accent)] transition-all duration-150"
                          style={{ width: `${scanningProgress}%` }}
                        />
                      </div>
                      <div className="flex justify-between font-mono text-xs text-[var(--muted-foreground)]">
                        <span>Auditing logs</span>
                        <span className="text-[var(--accent)] font-bold">{scanningProgress}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step: Results Dashboard */}
              {examStep === 'result' && (
                isDrumrollActive ? (
                  <div className="max-w-md w-full mx-auto text-center py-12 space-y-4">
                    <div className="crimson-card p-8 space-y-4">
                      <Trophy size={36} className="text-[var(--accent)] mx-auto" />
                      <h3 className="text-base font-bold text-[var(--foreground)]">Calibrating Grade Vectors</h3>
                      <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                        Evaluating accuracy and generating certified score parameters...
                      </p>
                      <div className="h-1.5 w-full bg-[var(--secondary)] rounded-[var(--radius)] overflow-hidden">
                        <motion.div 
                          className="h-full bg-[var(--accent)]"
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 1.2, ease: "linear" }}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="max-w-2xl w-full mx-auto space-y-5 text-left">
                    <div className="crimson-card p-6 sm:p-8 space-y-6 text-center">
                      <div className="space-y-2">
                        <div className="inline-flex flex-col items-center justify-center w-28 h-28 rounded-full border-2 border-[var(--border)] bg-[var(--secondary)] mx-auto shadow-xs">
                          <span className="text-3xl font-bold text-[var(--foreground)] font-mono tabular-nums leading-none">
                            {animatedScore}
                          </span>
                          <span className="text-[11px] text-[var(--muted-foreground)] font-mono mt-1 font-semibold">
                            OF {currentExamQuestions.length}
                          </span>
                        </div>

                        <h2 className="text-[clamp(1.1rem,3vw,1.4rem)] font-bold text-[var(--foreground)] mt-2">
                          Grade Calibration Metrics
                        </h2>
                        <p className={`text-sm font-bold ${performance.color}`}>
                          {performance.rank}: {performance.msg}
                        </p>
                      </div>

                      {/* Accuracy Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-left">
                        <div className="bg-[var(--secondary)]/50 p-3 rounded-[var(--radius)] border border-[var(--border)]">
                          <BarChart3 size={15} className="text-[var(--muted-foreground)] mb-1" />
                          <span className="text-[11px] text-[var(--muted-foreground)] font-semibold uppercase tracking-[0.03em] block">Grade Accuracy</span>
                          <p className="text-base font-bold text-[var(--foreground)] font-mono tabular-nums">
                            {(animatedScore / currentExamQuestions.length * 100).toFixed(1)}%
                          </p>
                        </div>
                        <div className="bg-[var(--secondary)]/50 p-3 rounded-[var(--radius)] border border-[var(--border)]">
                          <Target size={15} className="text-[var(--muted-foreground)] mb-1" />
                          <span className="text-[11px] text-[var(--muted-foreground)] font-semibold uppercase tracking-[0.03em] block">Correct Nodes</span>
                          <p className="text-base font-bold text-[var(--accent)] font-mono tabular-nums">
                            {animatedScore} <span className="text-xs text-[var(--muted-foreground)]">/ {currentExamQuestions.length}</span>
                          </p>
                        </div>
                        <div className="bg-[var(--secondary)]/50 p-3 rounded-[var(--radius)] border border-[var(--border)]">
                          <X size={15} className="text-[var(--muted-foreground)] mb-1" />
                          <span className="text-[11px] text-[var(--muted-foreground)] font-semibold uppercase tracking-[0.03em] block">Fault Ledger</span>
                          <p className="text-base font-bold text-[var(--error)] font-mono tabular-nums">
                            {currentExamQuestions.length - score}
                          </p>
                        </div>
                        <div className="bg-[var(--secondary)]/50 p-3 rounded-[var(--radius)] border border-[var(--border)]">
                          <Clock size={15} className="text-[var(--muted-foreground)] mb-1" />
                          <span className="text-[11px] text-[var(--muted-foreground)] font-semibold uppercase tracking-[0.03em] block">Duration Expended</span>
                          <p className="text-base font-bold text-[var(--foreground)] font-mono tabular-nums">
                            {calculateRemainingSecondsTime(totalTimeTaken)}
                          </p>
                        </div>
                      </div>

                      {/* Proctor Report */}
                      <div className="bg-[var(--secondary)]/40 border border-[var(--border)] p-4 rounded-[var(--radius)] text-left space-y-2">
                        <h3 className="text-xs font-bold uppercase tracking-[0.03em] text-[var(--foreground)] flex items-center gap-1.5">
                          <Cpu size={14} className="text-[var(--accent)]" /> Proctor Intelligence Report
                        </h3>
                        <p className="text-xs text-[var(--foreground)]/85 leading-relaxed">
                          {customAIProcText}
                        </p>
                        <div className="border-t border-[var(--border)] pt-2 flex flex-wrap gap-4 text-[11px] text-[var(--muted-foreground)] font-mono">
                          <span>PROCTOR ID: NS-MONITOR-09</span>
                          <span>WARNINGS: {warnings} / 3</span>
                          <span>SPEED: {(totalTimeTaken / currentExamQuestions.length).toFixed(1)}s / question</span>
                        </div>
                      </div>

                      {/* Candidate info */}
                      <div className="bg-[var(--secondary)]/40 border border-[var(--border)] p-4 rounded-[var(--radius)] text-left grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <span className="text-[11px] text-[var(--muted-foreground)] uppercase tracking-[0.03em] block">Candidate Nominee</span>
                          <p className="font-bold text-[var(--foreground)]">{userData.name}</p>
                        </div>
                        <div>
                          <span className="text-[11px] text-[var(--muted-foreground)] uppercase tracking-[0.03em] block">Syllabus Track</span>
                          <p className="font-bold text-[var(--foreground)]">{userData.course}</p>
                        </div>
                        <div>
                          <span className="text-[11px] text-[var(--muted-foreground)] uppercase tracking-[0.03em] block">Attainment ID</span>
                          <p className="font-mono text-[var(--accent)] font-bold">{certificateId}</p>
                        </div>
                        <div>
                          <span className="text-[11px] text-[var(--muted-foreground)] uppercase tracking-[0.03em] block">Authorized Date</span>
                          <p className="font-mono text-[var(--foreground)]">{userData.date}</p>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
                        <button 
                          onClick={() => {
                            synthSvc.playSwell();
                            setRandomizedQuestionsList([]);
                            setExamStep('gate');
                          }}
                          className="btn-secondary py-2 px-3 text-xs cursor-pointer min-h-[44px]"
                        >
                          <RefreshCw size={14} /> Recalibrate Assessment
                        </button>
                        <button 
                          onClick={() => {
                            synthSvc.playClick();
                            setIsReviewMode(!isReviewMode);
                          }}
                          className={`py-2 px-3 rounded-[var(--radius)] border text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1.5 min-h-[44px]
                            ${isReviewMode ? 'bg-neutral-900 border-neutral-900 text-white' : 'border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--secondary)]'}`}
                        >
                          <Eye size={14} /> {isReviewMode ? 'Collapse Detailed Ledger' : 'Audit Response Vectors'}
                        </button>
                        
                        {isSufficientlyPassed && (
                          <button 
                            onClick={() => {
                              synthSvc.playSwell();
                              setExamStep('certificate');
                            }}
                            className="btn-primary py-2 px-4 text-xs cursor-pointer min-h-[44px]"
                            id="proceed-view-certificate-btn"
                          >
                            <Award size={14} /> Dispatch Certificate
                          </button>
                        )}

                        <button 
                          onClick={handleDownloadResultCard}
                          className="btn-secondary py-2 px-3 text-xs cursor-pointer min-h-[44px]"
                        >
                          <Download size={14} /> Export SVG
                        </button>
                      </div>

                      {/* Expanded Question Review */}
                      <AnimatePresence>
                        {isReviewMode && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.12 }}
                            className="mt-6 pt-6 border-t border-[var(--border)] space-y-3 text-left overflow-hidden"
                          >
                            <h3 className="text-xs font-bold uppercase tracking-[0.03em] text-[var(--foreground)] mb-2">
                              Intelligent Response Comparison Audit
                            </h3>
                            {currentExamQuestions.map((q, idx) => (
                              <div key={idx} className={`p-3.5 rounded-[var(--radius)] border 
                                ${answers[idx] === q.answer ? 'bg-[var(--card)] border-[var(--accent)]' : 'bg-[var(--card)] border-[var(--error)]'}`}
                              >
                                <p className="font-bold text-[var(--foreground)] text-xs mb-2 flex gap-1.5">
                                  <span className="font-mono text-[var(--muted-foreground)]">#{(idx + 1).toString().padStart(2, '0')}.</span>
                                  <span>{q.question}</span>
                                </p>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                                  <div className={`p-2 rounded-[var(--radius)] flex items-center gap-1.5 ${answers[idx] === q.answer ? 'text-[var(--accent)] bg-[var(--accent-light)]' : 'text-[var(--error)] bg-[var(--error)]/10'}`}>
                                    {answers[idx] === q.answer ? <Check size={13} /> : <X size={13} />}
                                    <span>Allocated: {answers[idx] || 'Unanswered'}</span>
                                  </div>
                                  {answers[idx] !== q.answer && (
                                    <div className="p-2 rounded-[var(--radius)] bg-[var(--accent-light)] text-[var(--accent)] flex items-center gap-1.5">
                                      <Check size={13} /> Correct Target: {q.answer}
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

              {/* Step: Printable Certificate (Classic Double Border) */}
              {examStep === 'certificate' && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.12 }}
                  className="max-w-2xl w-full mx-auto"
                >
                  <div id="certificate-container" className="bg-[var(--card)] text-[var(--foreground)] rounded-2xl border-4 border-double border-[var(--border)] p-8 sm:p-12 text-center shadow-xs">
                    <div className="flex justify-center mb-3">
                      <div className="w-12 h-12 bg-neutral-900 text-white rounded-full flex items-center justify-center">
                        <Trophy size={20} />
                      </div>
                    </div>

                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight uppercase mb-1 font-serif">
                      Certificate of Achievement
                    </h1>
                    <div className="h-0.5 w-16 bg-[var(--accent)] mx-auto mb-3" />
                    <p className="text-[11px] font-semibold tracking-[0.05em] text-[var(--muted-foreground)] uppercase">
                      NS Technology Academics Verification
                    </p>

                    <div className="space-y-3 my-6">
                      <p className="text-xs italic text-[var(--muted-foreground)]">This is to certify that candidate nominee</p>
                      <h2 className="text-2xl sm:text-3xl font-bold underline underline-offset-4 decoration-[var(--border)] font-serif">
                        {userData.name}
                      </h2>
                      <p className="text-xs italic text-[var(--muted-foreground)]">has successfully completed computational examinations inside portal nodes for</p>
                      <h3 className="text-base sm:text-lg font-bold text-[var(--accent)] font-serif">
                        {userData.course}
                      </h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4 my-6 text-center text-xs max-w-sm mx-auto">
                      <div>
                        <span className="text-[11px] text-[var(--muted-foreground)] font-semibold uppercase block">Credential ID</span>
                        <span className="font-mono font-bold">{certificateId}</span>
                      </div>
                      <div>
                        <span className="text-[11px] text-[var(--muted-foreground)] font-semibold uppercase block">Accuracy Achieved</span>
                        <span className="font-mono font-bold">{percentageGradeRatio.toFixed(1)}%</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 w-full items-end mt-6 pt-6 border-t border-[var(--border)] text-xs text-[var(--muted-foreground)]">
                      <div className="text-left">
                        <div className="font-bold text-[var(--foreground)]">NS Technology</div>
                        <span className="text-[10px] uppercase">Board of Assessment</span>
                      </div>
                      <div className="text-right">
                        <div className="font-mono font-bold text-[var(--foreground)]">{userData.date}</div>
                        <span className="text-[10px] uppercase">Date Issued</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3 no-print">
                    <button 
                      onClick={() => {
                        synthSvc.playClick();
                        setExamStep('result');
                      }}
                      className="btn-secondary py-2.5 px-4 text-xs cursor-pointer min-h-[44px]"
                    >
                      <ChevronLeft size={14} /> Return to Metrics
                    </button>
                    <button 
                      onClick={() => window.print()}
                      className="btn-primary py-2.5 px-5 text-xs cursor-pointer min-h-[44px]"
                    >
                      <Download size={14} /> Download Certificate (Print/PDF)
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* ====================================================
              3. FAQ SECTION
              ==================================================== */}
          {activeTab === 'faq' && (
            <motion.div 
              key="faq-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12 }}
              className="max-w-2xl w-full text-left space-y-6"
              id="faq-accordion-portal"
            >
              <div className="text-center space-y-1">
                <h2 className="text-[clamp(1.1rem,3vw,1.4rem)] font-bold text-[var(--foreground)]">
                  Frequently Asked Questions
                </h2>
                <p className="text-xs text-[var(--muted-foreground)]">Common questions and operational guidance</p>
              </div>

              {/* FAQ Search Bar */}
              <div className="relative">
                <input 
                  type="text"
                  placeholder="Query system rule details..."
                  value={faqCriteria}
                  onChange={(e) => setFaqCriteria(e.target.value)}
                  className="crimson-input w-full pl-9 pr-4 py-2.5 text-xs placeholder:text-[var(--muted-foreground)]"
                  id="faq-search-criteria"
                />
                <Search size={14} className="text-[var(--muted-foreground)] absolute left-3 top-1/2 -translate-y-1/2" />
              </div>

              <div className="space-y-2">
                {filteredFaqList.length > 0 ? (
                  filteredFaqList.map((item, idx) => (
                    <div 
                      key={idx}
                      className="crimson-card overflow-hidden transition-colors"
                    >
                      <button 
                        onClick={() => handleToggleFaqIndex(idx)}
                        className="w-full p-4 text-left flex justify-between items-center gap-4 hover:bg-[var(--secondary)]/50 transition-colors cursor-pointer min-h-[44px]"
                      >
                        <h3 className="font-bold text-xs sm:text-sm text-[var(--foreground)]">
                          {item.q}
                        </h3>
                        <ChevronDown 
                          size={15} 
                          className={`text-[var(--muted-foreground)] transition-transform duration-150 shrink-0 ${openedFaqIndices[idx] ? 'rotate-180 text-[var(--accent)]' : ''}`} 
                        />
                      </button>

                      <AnimatePresence>
                        {openedFaqIndices[idx] && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.12 }}
                            className="overflow-hidden border-t border-[var(--border)]"
                          >
                            <div className="p-4 text-xs sm:text-[14px] text-[var(--foreground)]/85 leading-relaxed bg-[var(--secondary)]/30">
                              {item.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-[var(--muted-foreground)] text-xs">
                    No matching questions found.
                  </div>
                )}
              </div>

              {/* Developer Profile (Suraj Rawat) */}
              <div className="pt-8 border-t border-[var(--border)] space-y-4">
                <div className="text-center">
                  <span className="text-[12px] font-semibold text-[var(--accent)] uppercase tracking-[0.03em]">
                    Developer Profile
                  </span>
                  <h2 className="text-base sm:text-lg font-bold text-[var(--foreground)] mt-0.5">Meet the Creator</h2>
                </div>

                <div className="crimson-card p-6 sm:p-8 text-center space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-lg sm:text-xl font-bold text-[var(--foreground)]">
                      Suraj Rawat
                    </h3>
                    <p className="text-xs text-[var(--accent)] font-semibold">
                      BCA Student | Graphic Era Hill University, Haldwani
                    </p>
                  </div>

                  <p className="text-xs sm:text-[14px] text-[var(--foreground)]/85 leading-relaxed max-w-lg mx-auto">
                    Passionate about building modern responsive web applications with clean UI, smooth user experiences, and futuristic frontend design.
                  </p>

                  <div className="flex flex-wrap justify-center gap-2 pt-1">
                    <a 
                      href="https://github.com/SurajRawatr07" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn-secondary text-xs px-3.5 py-1.5 min-h-[44px]"
                    >
                      <Github size={14} /> GitHub <ExternalLink size={10} className="opacity-50" />
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/suraj-rawat-30513b340" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn-secondary text-xs px-3.5 py-1.5 min-h-[44px]"
                    >
                      <Linkedin size={14} className="text-[var(--accent)]" /> LinkedIn <ExternalLink size={10} className="opacity-50" />
                    </a>
                    <a 
                      href="https://instagram.com/surajrawat07" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn-secondary text-xs px-3.5 py-1.5 min-h-[44px]"
                    >
                      <Instagram size={14} className="text-[var(--accent)]" /> Instagram <ExternalLink size={10} className="opacity-50" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ====================================================
          4. APP-LIKE FIXED BOTTOM TAB BAR (3 ITEMS)
          - Home, Exam, FAQ
          - Background --card, top border --border
          - Active tab has neutral-900 icon & label and thin top indicator line
          - Compact centered bar on desktop
          ==================================================== */}
      <nav 
        className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--card)] border-t border-[var(--border)] pb-safe md:max-w-md md:mx-auto md:bottom-4 md:rounded-2xl md:border md:shadow-sm no-print"
        aria-label="Bottom Navigation"
      >
        <div className="flex items-center justify-around h-15 sm:h-16 px-1">
          {/* Tab 1: Home */}
          <button 
            onClick={() => {
              synthSvc.playClick();
              setActiveTab('home');
            }}
            className={`flex-1 flex flex-col items-center justify-center py-1 min-h-[44px] min-w-[44px] transition-transform active:scale-95 cursor-pointer relative h-full
              ${activeTab === 'home' ? 'text-neutral-900' : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'}`}
            id="nav-tab-home-btn"
          >
            {activeTab === 'home' && (
              <span className="absolute top-0 inset-x-4 h-[2px] bg-neutral-900 rounded-full" />
            )}
            <Home size={18} className="mb-0.5" />
            <span className="text-[11px] font-semibold tracking-[0.01em]">Home</span>
          </button>

          {/* Tab 2: Exam */}
          <button 
            onClick={() => {
              synthSvc.playClick();
              setActiveTab('exam');
            }}
            className={`flex-1 flex flex-col items-center justify-center py-1 min-h-[44px] min-w-[44px] transition-transform active:scale-95 cursor-pointer relative h-full
              ${activeTab === 'exam' ? 'text-neutral-900' : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'}`}
            id="nav-tab-exam-btn"
          >
            {activeTab === 'exam' && (
              <span className="absolute top-0 inset-x-4 h-[2px] bg-neutral-900 rounded-full" />
            )}
            <ShieldCheck size={18} className="mb-0.5" />
            <span className="text-[11px] font-semibold tracking-[0.01em]">Exam</span>
          </button>

          {/* Tab 3: FAQ */}
          <button 
            onClick={() => {
              synthSvc.playClick();
              setActiveTab('faq');
            }}
            className={`flex-1 flex flex-col items-center justify-center py-1 min-h-[44px] min-w-[44px] transition-transform active:scale-95 cursor-pointer relative h-full
              ${activeTab === 'faq' ? 'text-neutral-900' : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'}`}
            id="nav-tab-faq-btn"
          >
            {activeTab === 'faq' && (
              <span className="absolute top-0 inset-x-4 h-[2px] bg-neutral-900 rounded-full" />
            )}
            <MessageSquare size={18} className="mb-0.5" />
            <span className="text-[11px] font-semibold tracking-[0.01em]">FAQ</span>
          </button>
        </div>
      </nav>

      {/* Modal: Rules / Help */}
      <AnimatePresence>
        {showHelpModal && (
          <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-black/50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.12 }}
              className="bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius)] p-6 max-w-md w-full text-left shadow-lg"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-bold uppercase text-[var(--foreground)] flex items-center gap-1.5">
                  <ShieldCheck size={18} className="text-[var(--accent)]" /> Secure Constraints
                </h3>
                <button 
                  onClick={() => setShowHelpModal(false)}
                  className="p-1 text-[var(--muted-foreground)] hover:text-[var(--foreground)] rounded cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="space-y-3 text-xs text-[var(--foreground)]/85 leading-relaxed">
                <div className="p-3 bg-[var(--secondary)]/60 border border-[var(--border)] rounded-[var(--radius)] space-y-1 font-mono text-[11px]">
                  <p className="text-[var(--accent)] font-bold uppercase">Passcodes:</p>
                  <p>• Basic Computer: <span className="font-bold">NSTECHBASIC</span></p>
                  <p>• Tally ERP: <span className="font-bold">NSTECHTALLY</span></p>
                  <p>• Web Designing: <span className="font-bold">NSTECHWEB</span></p>
                </div>

                <p>1. Input candidate Full Name for certificate credentialing.</p>
                <p>2. Choose expertise course track and inject matching passcode verification key.</p>
                <p>3. The system monitors active browser visibility bounds. Tab switching triggers alerts and eventually auto-submits score vectors.</p>
              </div>

              <button 
                onClick={() => {
                  synthSvc.playClick();
                  setShowHelpModal(false);
                }}
                className="btn-primary w-full mt-4 py-2 text-xs min-h-[44px]"
              >
                Accept Parameters
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal: Anti-cheat Violation Alert */}
      <AnimatePresence>
        {showViolationModal && (
          <div className="fixed inset-0 z-[140] flex items-center justify-center p-4 bg-black/60">
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.12 }}
              className="bg-[var(--card)] border border-[var(--error)] rounded-[var(--radius)] p-6 max-w-sm w-full text-center shadow-lg"
            >
              <div className="w-12 h-12 bg-[var(--error)]/10 text-[var(--error)] rounded-full flex items-center justify-center mx-auto mb-3">
                <ShieldAlert size={26} />
              </div>
              
              <h3 className="text-base font-bold text-[var(--foreground)] mb-1">
                Window Violation Detected
              </h3>
              
              <p className="text-xs text-[var(--muted-foreground)] leading-relaxed mb-4">
                Your activity has been flagged. Switching windows is strictly prohibited and recorded.
              </p>

              <div className="bg-[var(--error)]/10 border border-[var(--error)]/30 rounded-[var(--radius)] p-3 mb-4">
                <p className="text-[11px] text-[var(--muted-foreground)] uppercase tracking-[0.04em]">Active Violation Count</p>
                <p className="text-2xl font-mono font-bold text-[var(--error)] mt-0.5">
                  {warnings} <span className="text-[var(--muted-foreground)] text-sm">/ 3</span>
                </p>
                <p className="text-[10px] text-[var(--muted-foreground)] mt-1">Instant auto-submission occurs on the 3rd infraction.</p>
              </div>

              <button 
                onClick={() => {
                  synthSvc.playClick();
                  setShowViolationModal(false);
                }}
                className="w-full py-2.5 rounded-[var(--radius)] bg-[var(--error)] text-white font-bold text-xs uppercase tracking-wider transition-opacity hover:opacity-90 cursor-pointer min-h-[44px]"
              >
                Acknowledge and Refocus
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal: Submit Confirmation */}
      <AnimatePresence>
        {showSubmitModal && (
          <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-black/50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.12 }}
              className="bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius)] p-6 max-w-sm w-full text-center shadow-lg"
            >
              <div className="w-12 h-12 bg-[var(--secondary)] text-[var(--accent)] rounded-full flex items-center justify-center mx-auto mb-3">
                <AlertTriangle size={22} />
              </div>
              <h3 className="text-base font-bold text-[var(--foreground)] mb-1">Finalize Grade Analysis?</h3>
              <p className="text-xs text-[var(--muted-foreground)] mb-5 leading-relaxed">
                Once submitted, accuracy calculations compile instantly and certificate locks trigger. Confirm transaction?
              </p>
              <div className="flex gap-2.5">
                <button 
                  onClick={() => setShowSubmitModal(false)}
                  className="btn-secondary flex-1 py-2 text-xs min-h-[44px]"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    setShowSubmitModal(false);
                    commenceScanningComputation();
                  }}
                  className="btn-primary flex-1 py-2 text-xs min-h-[44px]"
                  id="final-submission-modal-btn"
                >
                  Confirm Transmit
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal: Welcome Popup before Exam Launches */}
      <AnimatePresence>
        {showWelcomePopup && (
          <div className="fixed inset-0 z-[140] flex items-center justify-center p-4 bg-black/50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.12 }}
              className="bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius)] p-6 max-w-sm w-full text-center space-y-4 shadow-lg"
            >
              <div className="w-12 h-12 rounded-full bg-[var(--secondary)] text-[var(--accent)] flex items-center justify-center mx-auto">
                <ShieldCheck size={26} />
              </div>

              <div className="space-y-1">
                <span className="text-[12px] font-semibold text-[var(--accent)] uppercase tracking-[0.03em]">
                  Verification Complete
                </span>
                <h3 className="text-lg font-bold text-[var(--foreground)]">
                  Best of Luck, {userData.name}!
                </h3>
                <p className="text-xs text-[var(--muted-foreground)]">
                  Your secure environment session logs are validated.
                </p>
              </div>

              <div className="p-3 bg-[var(--secondary)]/50 border border-[var(--border)] rounded-[var(--radius)] text-left space-y-1.5 text-xs text-[var(--foreground)]">
                <div className="flex justify-between">
                  <span className="text-[var(--muted-foreground)]">Total Questions:</span>
                  <span className="font-bold">20 items</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--muted-foreground)]">Allocated Time:</span>
                  <span className="font-bold">15 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--muted-foreground)]">Warning Limits:</span>
                  <span className="font-bold text-[var(--error)]">3 infractions max</span>
                </div>
              </div>

              <button
                onClick={() => {
                  synthSvc.playSwell();
                  setShowWelcomePopup(false);
                  setExamStep('quiz');
                  triggerInstantToast("Assessment launched", "success");
                }}
                className="btn-primary w-full py-2.5 text-xs uppercase tracking-wider min-h-[44px]"
              >
                Launch Assessment Matrix
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Toast Notifications */}
      <div className="fixed top-16 right-4 z-[150] space-y-2 pointer-events-none max-w-xs w-full">
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.12 }}
              className={`p-3 rounded-[var(--radius)] shadow-md flex items-center gap-2 border pointer-events-auto text-xs font-semibold
                ${toast.type === 'success' ? 'bg-[var(--card)] text-[var(--accent)] border-[var(--accent)]' : 
                  toast.type === 'warning' ? 'bg-[var(--card)] text-[var(--error)] border-[var(--error)]' : 
                  'bg-[var(--card)] text-[var(--foreground)] border-[var(--border)]'}`}
            >
              <AlertCircle size={15} className="shrink-0" />
              <span>{toast.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <footer className="w-full py-6 mt-12 text-center text-[var(--muted-foreground)] text-xs no-print select-none">
        © 2026 NS Technology. All rights reserved.
      </footer>
    </div>
  );
}
