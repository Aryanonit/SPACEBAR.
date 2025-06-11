// Add language support to the text database
type Difficulty = "easy" | "medium" | "hard" | "expert";
type Mode = "words" | "code" | "email" | "punctuation" | "numbers";
type TextsByDifficulty = { [key in Difficulty]: string[] };
type LanguageData = {
  [key in Mode]?: TextsByDifficulty;
};
type TextDatabase = {
  [language: string]: LanguageData;
};

const textDatabase: TextDatabase = {
  // English texts remain the same
  en: {
    words: {
      easy: [
        "The quick brown fox jumps over the lazy dog.",
        "A journey of a thousand miles begins with a single step.",
        "Practice makes perfect when you focus on your goals.",
        "Every expert was once a beginner who never gave up.",
      ],
      medium: [
        "The five boxing wizards jump quickly through the misty forest while carrying heavy equipment.",
        "Programming requires patience, persistence, and problem-solving skills to master effectively.",
        "Artificial intelligence and machine learning are transforming how we interact with technology.",
        "Climate change affects global weather patterns, ocean currents, and biodiversity worldwide.",
      ],
      hard: [
        "Cryptographic algorithms utilize mathematical complexity to ensure data security and privacy in digital communications.",
        "Quantum computing leverages superposition and entanglement phenomena to process information exponentially faster than classical computers.",
        "Neuroplasticity demonstrates the brain's remarkable ability to reorganize, adapt, and form new neural connections throughout life.",
        "Bioengineering combines principles from biology, chemistry, physics, and engineering to develop innovative medical solutions.",
      ],
      expert: [
        "The implementation of distributed consensus algorithms in blockchain networks requires Byzantine fault tolerance mechanisms.",
        "Stochastic gradient descent optimization with momentum and adaptive learning rates significantly improves neural network convergence.",
        "Microservices architecture patterns enable scalable, maintainable systems through containerization and orchestration frameworks.",
        "Photosynthetic carbon fixation pathways in C4 plants demonstrate evolutionary adaptations to high-temperature, low-CO2 environments.",
      ],
    },

    code: {
      easy: [
        "function hello() { console.log('Hello World'); }",
        "const name = 'John'; let age = 25; var city = 'NYC';",
        "if (x > 0) { return true; } else { return false; }",
        "for (let i = 0; i < 10; i++) { print(i); }",
      ],
      medium: [
        "const fetchData = async (url) => { const response = await fetch(url); return response.json(); };",
        "class Calculator { constructor() { this.result = 0; } add(x) { this.result += x; return this; } }",
        "const users = data.filter(user => user.age >= 18).map(user => ({ ...user, adult: true }));",
        "try { const result = JSON.parse(jsonString); } catch (error) { console.error('Parse error:', error); }",
      ],
      hard: [
        "const memoize = (fn) => { const cache = new Map(); return (...args) => { const key = JSON.stringify(args); return cache.has(key) ? cache.get(key) : cache.set(key, fn(...args)).get(key); }; };",
        "function* fibonacci() { let [a, b] = [0, 1]; while (true) { yield a; [a, b] = [b, a + b]; } }",
        "const debounce = (func, delay) => { let timeoutId; return (...args) => { clearTimeout(timeoutId); timeoutId = setTimeout(() => func.apply(this, args), delay); }; };",
        "interface Repository<T> { findById(id: string): Promise<T | null>; save(entity: T): Promise<T>; delete(id: string): Promise<void>; }",
      ],
      expert: [
        "type DeepReadonly<T> = { readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P] };",
        "const createAsyncIterator = <T>(items: T[], delay: number) => ({ async *[Symbol.asyncIterator]() { for (const item of items) { await new Promise(resolve => setTimeout(resolve, delay)); yield item; } } });",
        "function pipe<T>(...fns: Array<(arg: T) => T>): (value: T) => T { return (value: T) => fns.reduce((acc, fn) => fn(acc), value); }",
        "const withRetry = <T extends any[], R>(fn: (...args: T) => Promise<R>, maxRetries: number = 3) => async (...args: T): Promise<R> => { for (let i = 0; i <= maxRetries; i++) { try { return await fn(...args); } catch (error) { if (i === maxRetries) throw error; await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000)); } } };",
      ],
    },

    email: {
      easy: [
        "Hi John, Thank you for your email. I will get back to you soon. Best regards, Sarah",
        "Dear Team, Please join us for the meeting tomorrow at 2 PM. Thanks, Manager",
        "Hello, I hope this email finds you well. Let me know if you need anything. Cheers!",
        "Good morning! The project is on track. We should finish by Friday. Have a great day!",
      ],
      medium: [
        "Dear Mr. Johnson, I am writing to follow up on our previous conversation regarding the quarterly budget review. Could we schedule a meeting next week to discuss the proposed changes? Please let me know your availability. Best regards, Emily Chen",
        "Hi everyone, I wanted to update you on the progress of our marketing campaign. We've seen a 15% increase in engagement over the past month, which exceeds our initial projections. The team has done excellent work, and I'm confident we'll meet our Q4 targets.",
        "Subject: Urgent - Server Maintenance Window. Dear IT Team, We need to schedule emergency maintenance for our primary database server this weekend. The maintenance window is from Saturday 11 PM to Sunday 6 AM. Please ensure all critical backups are completed beforehand.",
        "Hello Sarah, Thank you for your interest in our software development position. After reviewing your portfolio and conducting the technical interview, we're pleased to move forward with the next step in our hiring process. HR will contact you within 48 hours to discuss the offer details.",
      ],
      hard: [
        "Dear Board Members, I am pleased to present the comprehensive annual report detailing our organization's performance metrics, financial statements, strategic initiatives, and market analysis for the fiscal year 2024. The document encompasses revenue growth of 23%, operational efficiency improvements, customer satisfaction scores, and our roadmap for sustainable expansion into emerging markets.",
        "Subject: Critical Security Incident Response Protocol. This message serves as formal notification of a potential data breach detected in our customer database at 14:32 UTC. Our cybersecurity team has immediately implemented containment measures, isolated affected systems, and initiated forensic analysis. All stakeholders must follow the established incident response procedures outlined in section 7.3 of our security manual.",
        "Dear Valued Stakeholders, Following extensive market research, competitive analysis, and internal strategic planning sessions, we have decided to pivot our business model toward a subscription-based SaaS platform. This transformation will require significant technological infrastructure upgrades, workforce restructuring, and customer migration strategies over the next 18 months.",
        "To Whom It May Concern: This letter serves as official documentation of the contractual agreement modifications discussed during our legal review meeting. The amendments include revised payment terms, updated intellectual property clauses, enhanced confidentiality provisions, and adjusted liability limitations as per the recommendations from our legal counsel.",
      ],
      expert: [
        "Dear Distinguished Colleagues, I am writing to formally propose a collaborative research initiative focused on developing next-generation quantum cryptographic protocols for securing distributed ledger technologies. This interdisciplinary project would leverage our combined expertise in theoretical computer science, applied mathematics, and experimental physics to address the emerging challenges posed by quantum computing threats to current cryptographic standards.",
        "Subject: Comprehensive Due Diligence Report - Merger & Acquisition Analysis. Following our extensive evaluation of the target company's financial statements, operational procedures, technological assets, intellectual property portfolio, regulatory compliance status, and market positioning, we have identified several critical factors that require immediate attention before proceeding with the proposed acquisition.",
        "Dear Executive Committee, The attached strategic transformation roadmap outlines our organization's transition toward a data-driven, AI-enhanced operational framework. This comprehensive plan encompasses infrastructure modernization, workforce development programs, regulatory compliance adaptations, customer experience optimization, and competitive positioning strategies for the next five-year period.",
        "To the International Standards Committee: We respectfully submit this formal proposal for establishing new industry standards regarding sustainable manufacturing processes, environmental impact assessment methodologies, and carbon footprint reduction protocols. Our research consortium has developed evidence-based recommendations that could significantly improve global supply chain sustainability while maintaining economic viability.",
      ],
    },

    punctuation: {
      easy: [
        "Hello, world! How are you today? I'm fine, thanks.",
        "It's a beautiful day. The sun is shining, and birds are singing.",
        "Can you help me? I need to finish this project by 5:00 PM.",
        'She said, "I\'ll be there soon." Then she left quickly.',
      ],
      medium: [
        "The conference (scheduled for March 15th) will cover AI, ML, and data science topics; however, registration closes on February 28th.",
        "According to the report, sales increased by 25% in Q3; nevertheless, expenses rose by 30%, resulting in decreased profit margins.",
        "The team's objectives include: improving user experience, reducing load times, implementing security measures, and enhancing mobile responsiveness.",
        '"Innovation distinguishes between a leader and a follower," said Steve Jobs—a quote that continues to inspire entrepreneurs worldwide.',
      ],
      hard: [
        "The multi-phase project encompasses several key components: (1) infrastructure assessment; (2) stakeholder consultation; (3) implementation planning; and (4) post-deployment evaluation—each requiring specialized expertise and careful coordination.",
        "Dr. Smith's research (published in Nature, Vol. 587, pp. 123-145) demonstrates that climate change affects biodiversity; however, the study's methodology has been questioned by peers, particularly regarding sample size and statistical significance.",
        "The contract stipulates the following terms: payment within 30 days; delivery by December 31st, 2024; quality assurance testing; and compliance with ISO 9001 standards—failure to meet any requirement may result in penalties.",
        '"The future belongs to those who believe in the beauty of their dreams," Eleanor Roosevelt once said; this philosophy continues to guide our organization\'s mission, vision, and strategic planning initiatives.',
      ],
      expert: [
        "The comprehensive analysis reveals several critical findings: (a) market volatility has increased by 15.7% year-over-year; (b) consumer confidence indices show mixed signals across demographic segments; (c) regulatory changes may impact Q4 projections; and (d) technological disruptions continue to reshape industry dynamics—requiring immediate strategic adjustments.",
        'According to the peer-reviewed study (Johnson et al., 2024), "The correlation between socioeconomic factors and educational outcomes remains statistically significant (p < 0.001); however, causation cannot be definitively established without longitudinal data spanning multiple generations."',
        "The board's resolution addresses multiple concerns: executive compensation packages; shareholder voting rights; environmental, social, and governance (ESG) compliance; merger and acquisition strategies; and risk management protocols—each requiring careful deliberation and stakeholder input.",
        '"In the midst of winter, I found there was, within me, an invincible summer," wrote Albert Camus; this existential insight resonates with contemporary discussions about resilience, adaptability, and human potential in the face of unprecedented global challenges.',
      ],
    },

    numbers: {
      easy: [
        "I have 5 apples, 3 oranges, and 2 bananas in my basket.",
        "The meeting is scheduled for 2:30 PM on March 15th, 2024.",
        "Call me at 555-123-4567 or email john@example.com for details.",
        "The price is $29.99, but with a 10% discount, it's only $26.99.",
      ],
      medium: [
        "The server uptime was 99.97% last month, with only 2.16 hours of downtime across 720 total hours of operation.",
        "Our Q3 revenue reached $2,847,392.50, representing a 23.7% increase compared to Q2's $2,305,128.75 performance.",
        "The algorithm processes 1,250,000 records per second with 0.003% error rate and 15.7ms average response time.",
        "IPv4 address 192.168.1.1 connects to port 8080, while the backup server uses 10.0.0.254:3306 for database access.",
      ],
      hard: [
        "The statistical analysis reveals a correlation coefficient of 0.847 (p < 0.001) between variables X and Y across 15,000 data points collected over 36 months.",
        "Memory usage peaked at 87.3% (14.2GB of 16GB) during the stress test, while CPU utilization averaged 64.8% across 8 cores running at 3.2GHz.",
        "The financial model projects ROI of 18.5% over 5 years, with initial investment of $1,250,000 and annual cash flows of $347,500, $389,200, $425,800, and $468,300.",
        "GPS coordinates 40.7128°N, 74.0060°W mark the location where temperature readings of 23.7°C, humidity at 68.2%, and barometric pressure of 1013.25 hPa were recorded.",
      ],
      expert: [
        "The Monte Carlo simulation (n=1,000,000 iterations) yielded a 95% confidence interval of [2.847, 3.152] for the parameter estimate, with standard error σ = 0.0789 and chi-squared statistic χ² = 47.23 (df=12, p < 0.001).",
        "Quantum state |ψ⟩ = 0.707|0⟩ + 0.707|1⟩ demonstrates superposition with fidelity F = 0.9987, while the 16-qubit register maintains coherence time T₂ = 127.3μs at temperature T = 15.2mK.",
        "The cryptographic hash SHA-256 produces 256-bit output (64 hexadecimal characters) with computational complexity O(2^256), requiring approximately 2.77 × 10^70 operations for brute-force attack at current processing speeds of 10^18 hashes/second.",
        "Spectroscopic analysis reveals absorption peaks at wavelengths λ₁ = 589.0nm, λ₂ = 589.6nm (sodium D-lines) with FWHM = 0.006nm, measured using a spectrometer with resolution Δλ/λ = 10^-6 and signal-to-noise ratio SNR = 1,247:1.",
      ],
    },
  },

  // Spanish texts
  es: {
    words: {
      easy: [
        "El rápido zorro marrón salta sobre el perro perezoso.",
        "Un viaje de mil millas comienza con un solo paso.",
        "La práctica hace la perfección cuando te enfocas en tus metas.",
        "Cada experto fue una vez un principiante que nunca se rindió.",
      ],
      medium: [
        "Los cinco magos boxeadores saltan rápidamente a través del bosque brumoso mientras llevan equipo pesado.",
        "La programación requiere paciencia, persistencia y habilidades para resolver problemas para dominarla de manera efectiva.",
        "La inteligencia artificial y el aprendizaje automático están transformando la forma en que interactuamos con la tecnología.",
        "El cambio climático afecta los patrones climáticos globales, las corrientes oceánicas y la biodiversidad en todo el mundo.",
      ],
      hard: [
        "Los algoritmos criptográficos utilizan la complejidad matemática para garantizar la seguridad y privacidad de los datos en las comunicaciones digitales.",
        "La computación cuántica aprovecha los fenómenos de superposición y entrelazamiento para procesar información exponencialmente más rápido que las computadoras clásicas.",
        "La neuroplasticidad demuestra la notable capacidad del cerebro para reorganizarse, adaptarse y formar nuevas conexiones neuronales a lo largo de la vida.",
        "La bioingeniería combina principios de biología, química, física e ingeniería para desarrollar soluciones médicas innovadoras.",
      ],
      expert: [
        "La implementación de algoritmos de consenso distribuido en redes blockchain requiere mecanismos de tolerancia a fallas bizantinas.",
        "La optimización del descenso de gradiente estocástico con impulso y tasas de aprendizaje adaptativas mejora significativamente la convergencia de la red neuronal.",
        "Los patrones de arquitectura de microservicios permiten sistemas escalables y mantenibles a través de la contenedorización y marcos de orquestación.",
        "Las vías de fijación de carbono fotosintético en plantas C4 demuestran adaptaciones evolutivas a entornos de alta temperatura y bajo CO2.",
      ],
    },
    // Other Spanish modes would be defined here
  },

  // French texts
  fr: {
    words: {
      easy: [
        "Le rapide renard brun saute par-dessus le chien paresseux.",
        "Un voyage de mille lieues commence par un seul pas.",
        "C'est en pratiquant qu'on devient parfait quand on se concentre sur ses objectifs.",
        "Chaque expert était autrefois un débutant qui n'a jamais abandonné.",
      ],
      medium: [
        "Les cinq boxeurs magiciens sautent rapidement à travers la forêt brumeuse tout en transportant un équipement lourd.",
        "La programmation nécessite de la patience, de la persévérance et des compétences en résolution de problèmes pour la maîtriser efficacement.",
        "L'intelligence artificielle et l'apprentissage automatique transforment notre façon d'interagir avec la technologie.",
        "Le changement climatique affecte les modèles météorologiques mondiaux, les courants océaniques et la biodiversité dans le monde entier.",
      ],
      hard: [],
      expert: [],
      // Additional French content would be added here
    },
  },

  // German texts
  de: {
    words: {
      easy: [
        "Der schnelle braune Fuchs springt über den faulen Hund.",
        "Eine Reise von tausend Meilen beginnt mit einem einzigen Schritt.",
        "Übung macht den Meister, wenn man sich auf seine Ziele konzentriert.",
        "Jeder Experte war einmal ein Anfänger, der nie aufgegeben hat.",
      ],
      medium: [],
      hard: [],
      expert: [],
    },
  },
};

export function generateText(
  mode: string,
  difficulty: string,
  language: string
): string {
  const langData = textDatabase[language];
  if (!langData) return "No texts available for this language.";

  const modeData = langData[mode as Mode];
  if (!modeData) return "No texts available for this mode.";

  const texts = modeData[difficulty as Difficulty];
  if (!texts || texts.length === 0) return "No texts available for this difficulty.";

  // Return a random text from the array
  return texts[Math.floor(Math.random() * texts.length)];
}
