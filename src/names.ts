// Realistic Name, Email & Password Generator

// ── Name Data ──

const firstNamesMale = [
  "James", "John", "Robert", "Michael", "David", "William", "Richard", "Joseph",
  "Thomas", "Christopher", "Charles", "Daniel", "Matthew", "Anthony", "Mark",
  "Steven", "Andrew", "Paul", "Joshua", "Kenneth", "Kevin", "Brian", "George",
  "Timothy", "Ronald", "Edward", "Jason", "Jeffrey", "Ryan", "Jacob",
  "Nicholas", "Gary", "Eric", "Jonathan", "Stephen", "Larry", "Justin",
  "Scott", "Brandon", "Benjamin", "Samuel", "Raymond", "Gregory", "Frank",
  "Alexander", "Patrick", "Jack", "Dennis", "Nathan", "Peter", "Zachary",
  "Tyler", "Aaron", "Henry", "Douglas", "Jose", "Adam", "Noah", "Ethan",
  "Jeremy", "Walter", "Christian", "Keith", "Roger", "Austin", "Terry",
  "Sean", "Gerald", "Carl", "Harold", "Dylan", "Arthur", "Lawrence", "Marcus",
  "Owen", "Liam", "Caleb", "Lucas", "Hunter", "Connor", "Adrian", "Gabriel",
  "Julian", "Dominic", "Elijah", "Isaiah", "Cole", "Miles", "Leo", "Landon",
];

const firstNamesFemale = [
  "Mary", "Patricia", "Jennifer", "Linda", "Barbara", "Elizabeth", "Susan",
  "Jessica", "Sarah", "Karen", "Lisa", "Nancy", "Betty", "Margaret", "Sandra",
  "Ashley", "Dorothy", "Kimberly", "Emily", "Donna", "Michelle", "Carol",
  "Amanda", "Melissa", "Deborah", "Stephanie", "Rebecca", "Sharon", "Laura",
  "Cynthia", "Kathleen", "Amy", "Angela", "Shirley", "Anna", "Brenda",
  "Pamela", "Emma", "Nicole", "Helen", "Samantha", "Katherine", "Christine",
  "Debra", "Rachel", "Carolyn", "Janet", "Catherine", "Maria", "Heather",
  "Diane", "Ruth", "Julie", "Olivia", "Joyce", "Virginia", "Victoria",
  "Kelly", "Lauren", "Christina", "Joan", "Evelyn", "Judith", "Andrea",
  "Hannah", "Megan", "Cheryl", "Jacqueline", "Martha", "Gloria", "Teresa",
  "Sophia", "Grace", "Rose", "Natalie", "Alexis", "Kayla", "Charlotte",
  "Zoe", "Lily", "Ella", "Avery", "Scarlett", "Aria", "Chloe", "Nora",
  "Elena", "Clara", "Violet", "Hazel", "Stella", "Luna", "Maya", "Isla",
];

const lastNames = [
  "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller",
  "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez",
  "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin",
  "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark",
  "Ramirez", "Lewis", "Robinson", "Walker", "Young", "Allen", "King",
  "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores", "Green",
  "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell",
  "Carter", "Roberts", "Gomez", "Phillips", "Evans", "Turner", "Diaz",
  "Parker", "Cruz", "Edwards", "Collins", "Reyes", "Stewart", "Morris",
  "Morales", "Murphy", "Cook", "Rogers", "Gutierrez", "Ortiz", "Morgan",
  "Cooper", "Peterson", "Bailey", "Reed", "Kelly", "Howard", "Ramos",
  "Kim", "Cox", "Ward", "Richardson", "Watson", "Brooks", "Chavez",
  "Wood", "James", "Bennett", "Gray", "Mendoza", "Ruiz", "Hughes",
  "Price", "Alvarez", "Castillo", "Sanders", "Patel", "Myers", "Long",
  "Ross", "Foster", "Jimenez", "Powell", "Jenkins", "Perry", "Russell",
  "Sullivan", "Bell", "Coleman", "Butler", "Henderson", "Barnes", "Gonzales",
  "Fisher", "Vasquez", "Simmons", "Griffin", "Fox", "Walsh", "Wagner",
];

const middleNamesMale = [
  "Alexander", "James", "Michael", "William", "Robert", "David", "Joseph",
  "Edward", "Thomas", "Charles", "Henry", "Lee", "Ray", "Wayne", "Dean",
  "Alan", "Scott", "Paul", "John", "Patrick", "Allen", "Eugene", "Francis",
];

const middleNamesFemale = [
  "Marie", "Ann", "Lynn", "Rose", "Grace", "Jane", "Elizabeth", "May",
  "Louise", "Faith", "Hope", "Joy", "Renee", "Nicole", "Lee", "Kate",
  "Claire", "Elaine", "Irene", "Mae", "Leigh", "Rae", "Jean", "Dawn",
];

// ── Email Data ──

type EmailStyle =
  | "firstlast"       // john.smith
  | "firstinitiallast" // jsmith
  | "firstlastyear"   // john.smith92
  | "lastfirst"       // smith.john
  | "nickname"         // johnny_smith
  | "initiallast"     // j.smith
  | "firstlastnum"    // johnsmith42
  | "underscored"     // john_smith
  | "dotted_initials"; // j.s.42

const emailStyles: EmailStyle[] = [
  "firstlast", "firstinitiallast", "firstlastyear", "lastfirst",
  "nickname", "initiallast", "firstlastnum", "underscored", "dotted_initials",
];

// ── Password Data ──

const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = "abcdefghijklmnopqrstuvwxyz";
const DIGITS = "0123456789";
const SYMBOLS = "!@#$%^&*_+-=?";

const wordList = [
  "apple", "brave", "crane", "delta", "eagle", "flame", "grape", "house",
  "ivory", "jolly", "knack", "lemon", "maple", "noble", "ocean", "pearl",
  "quest", "river", "stone", "tiger", "ultra", "vivid", "whale", "xenon",
  "yield", "zephyr", "blaze", "frost", "cloud", "storm", "drift", "spark",
  "steel", "coral", "cedar", "amber", "orbit", "prism", "lunar", "solar",
  "pixel", "cyber", "nexus", "atlas", "bison", "crest", "dwarf", "ember",
  "fjord", "gleam", "haven", "jewel", "karma", "lotus", "mirth", "north",
  "oasis", "plaza", "quilt", "rogue", "siren", "tempo", "umbra", "vault",
  "wrath", "oxide", "yacht", "zebra", "crisp", "plume", "hatch", "swift",
];

// ── Helpers ──

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickChars(charset: string, count: number): string {
  return Array.from({ length: count }, () => charset[Math.floor(Math.random() * charset.length)]).join("");
}

// ── Email Generator ──

function generateEmailLocal(firstName: string, lastName: string): string {
  const style = pick(emailStyles);
  const first = firstName.toLowerCase();
  const last = lastName.toLowerCase();
  const year = randInt(70, 99).toString();
  const num = randInt(1, 999).toString();

  return `${first}${randInt(1, 99)}${randInt(0, 1) ? "_" : "."}${last}${randInt(1, 99)}`;

  switch (style) {
    case "firstlast":
      return `${first}.${last}`;
    case "firstinitiallast":
      return `${first[0]}${last}`;
    case "firstlastyear":
      return `${first}.${last}${year}`;
    case "lastfirst":
      return `${last}.${first}`;
    case "nickname":
      return `${first}${randInt(0, 1) ? "_" : ""}${last}${randInt(1, 99)}`;
    case "initiallast":
      return `${first[0]}.${last}`;
    case "firstlastnum":
      return `${first}${last}${num}`;
    case "underscored":
      return `${first}_${last}`;
    case "dotted_initials":
      return `${first[0]}.${last[0]}.${num}`;
    default:
      return `${first}.${last}`;
  }
}

function generateEmail(firstName: string, lastName: string): string {
  const local = generateEmailLocal(firstName, lastName);
  const domain = "outlook.com";
  return `${local}@${domain}`;
}

// ── Password Generator ──

type PasswordStrength = "weak" | "medium" | "strong" | "ultra";
type PasswordStyle = "random" | "passphrase" | "memorable";

interface PasswordOptions {
  strength?: PasswordStrength;
  style?: PasswordStyle;
  length?: number;
}

function generatePassword(options: PasswordOptions = {}): string {
  const { strength = "strong", style = "random" } = options;

  if (style === "passphrase") {
    const count = strength === "weak" ? 3 : strength === "medium" ? 4 : strength === "strong" ? 5 : 6;
    const words = Array.from({ length: count }, () => pick(wordList));
    const separator = pick(["-", "_", ".", "+"]);
    // Capitalize one random word and add a number
    const capIdx = randInt(0, words.length - 1);
    words[capIdx] = words[capIdx][0].toUpperCase() + words[capIdx].slice(1);
    return `${words.join(separator)}${randInt(10, 99)}`;
  }

  if (style === "memorable") {
    // Pattern: Word + Digits + Symbol + Word
    const w1 = pick(wordList);
    const w2 = pick(wordList);
    const sym = pick([...SYMBOLS]);
    const digits = randInt(10, 9999).toString();
    return `${w1[0].toUpperCase()}${w1.slice(1)}${digits}${sym}${w2[0].toUpperCase()}${w2.slice(1)}`;
  }

  // Random style
  const len =
    options.length ??
    (strength === "weak" ? 8 : strength === "medium" ? 12 : strength === "strong" ? 16 : 24);

  // Guarantee at least one of each required type
  const required = [pick([...UPPER]), pick([...LOWER]), pick([...DIGITS]), pick([...SYMBOLS])];
  const allChars = UPPER + LOWER + DIGITS + SYMBOLS;
  const rest = pickChars(allChars, len - required.length);
  return shuffle([...required, ...rest.split("")]).join("");
}

// ── Combined Generator ──

type Gender = "male" | "female" | "random";

interface GeneratorOptions {
  gender?: Gender;
  includeMiddleName?: boolean;
  passwordStrength?: PasswordStrength;
  passwordStyle?: PasswordStyle;
  count?: number;
}

interface GeneratedIdentity {
  firstName: string;
  middleName?: string;
  lastName: string;
  fullName: string;
  gender: "male" | "female";
  email: string;
  password: string;
}

function generate(options: GeneratorOptions = {}): GeneratedIdentity {
  const {
    gender = "random",
    includeMiddleName = false,
    passwordStrength = "strong",
    passwordStyle = "random",
  } = options;

  const resolvedGender: "male" | "female" =
    gender === "random" ? (Math.random() < 0.5 ? "male" : "female") : gender;

  const firstName = pick(resolvedGender === "male" ? firstNamesMale : firstNamesFemale);
  const middleName = includeMiddleName
    ? pick(resolvedGender === "male" ? middleNamesMale : middleNamesFemale)
    : undefined;
  const lastName = pick(lastNames);

  const fullName = middleName
    ? `${firstName} ${middleName} ${lastName}`
    : `${firstName} ${lastName}`;

  const email = generateEmail(firstName, lastName);
  const password = generatePassword({ strength: passwordStrength, style: passwordStyle });

  return { firstName, middleName, lastName, fullName, gender: resolvedGender, email, password };
}

function generateMany(options: GeneratorOptions = {}): GeneratedIdentity[] {
  const { count = 1, ...rest } = options;
  return Array.from({ length: count }, () => generate(rest));
}

export {
  generate,
  generateMany,
  generateEmail,
  generateEmailLocal,
  generatePassword,
  GeneratedIdentity,
  GeneratorOptions,
  PasswordOptions,
  PasswordStrength,
  PasswordStyle,
  Gender,
};