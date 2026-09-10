/**
 * LogicLike Games Catalog & Curriculum Engine
 * 3 Fully Coherent Educational Courses for Kids:
 * 1. 📐 Mathematics (Counting -> Addition -> Subtraction -> Multiplication -> Multi-Step Algebra)
 * 2. 🔬 Science & Nature (Animal Kingdom -> Biomes & Habitats -> States of Matter -> Space Astronomy -> Ecosystems & Energy)
 * 3. 💡 Aptitude & Logic (Visual Patterns -> 90° Rotations -> Multi-Attribute Venn -> Mirror Projections -> Deductive Syllogisms)
 *
 * Each level has a SINGLE, FOCUSED pedagogical learning objective.
 * All 5 puzzles inside a level teach and reinforce THAT SPECIFIC THEME across the 5 game engines:
 * 🎴 cards-grid | ⚖️ balance-scale | 🔢 rebus-keypad | 📦 spatial-3d | 🧩 sudoku-matrix
 */

export const GAMES_CATALOG = [
  /* ==========================================================================
     COURSE 1: 📐 MATHEMATICS
     ========================================================================== */
  {
    id: "math-course",
    name: "Mathematics",
    category: "math-course",
    icon: "📐",
    description: "Master arithmetic step-by-step: Counting Quantities ➔ Addition ➔ Subtraction ➔ Multiplication ➔ Multi-Step Algebra!",
    levelThemes: [
      { level: 1, name: "Counting & Number Quantities (1–10)", icon: "🍎", desc: "Count objects, compare quantities, and understand single-digit numbers" },
      { level: 2, name: "Addition & Making Target Sums", icon: "➕", desc: "Combine two groups, find total sums, and balance addition equations" },
      { level: 3, name: "Subtraction & Missing Differences", icon: "➖", desc: "Take away quantities, find differences, and solve missing-part balances" },
      { level: 4, name: "Multiplication & Equal Arrays", icon: "✖️", desc: "Repeated addition, factor arrays, and equal-group volume calculations" },
      { level: 5, name: "Multi-Step Algebra & Operations", icon: "🧮", desc: "Order of operations, 3-variable substitution systems, and Latin squares" }
    ],
    stages: [
      /* --- Level 1: Counting & Number Quantities (1–10) --- */
      {
        stageNum: 1,
        level: 1,
        levelStageNum: "1 of 5",
        title: "Count the Apples",
        subtitle: "Level 1: Counting • 🎴 Card Grid",
        prompt: "Which basket contains EXACTLY 5 apples?",
        type: "cards-grid",
        layout: "2x2",
        cards: [
          { id: "c1", icon: "🍎🍎🍎", label: "3 Apples", isCorrect: false },
          { id: "c2", icon: "🍎🍎🍎🍎", label: "4 Apples", isCorrect: false },
          { id: "c3", icon: "🍎🍎🍎🍎🍎", label: "5 Apples", isCorrect: true },
          { id: "c4", icon: "🍎🍎🍎🍎🍎🍎", label: "6 Apples", isCorrect: false }
        ],
        hint: "Point and count each apple one by one: 1, 2, 3, 4, 5!",
        review: "The third basket has exactly 5 apples (1 + 1 + 1 + 1 + 1 = 5)!"
      },
      {
        stageNum: 2,
        level: 1,
        levelStageNum: "2 of 5",
        title: "Match the Count Balance",
        subtitle: "Level 1: Counting • ⚖️ Balance Scale",
        prompt: "Left pan has a count of 5 kg. Drag the matching 5 kg weight to balance!",
        type: "balance-scale",
        leftWeights: [5],
        rightWeights: [],
        availableWeights: [2, 3, 4, 5],
        requiredRightTotal: 5,
        correctWeightToDrop: 5,
        hint: "Count 5 on the left pan. Drag the 5 kg weight to make both sides equal!",
        review: "5 kg on the left equals 5 kg on the right pan. Both sides balance at count 5!"
      },
      {
        stageNum: 3,
        level: 1,
        levelStageNum: "3 of 5",
        title: "Single Item Quantity Count",
        subtitle: "Level 1: Counting • 🔢 Rebus Keypad",
        prompt: "How many stars ⭐ are shown in this single group count?",
        type: "rebus-keypad",
        equations: [
          { left: ["⭐", "+", "⭐", "+", "⭐"], right: 9 }
        ],
        targetSymbol: "⭐",
        correctAnswer: 3,
        hint: "Three identical stars count up to 9. Split 9 into 3 equal parts (3 + 3 + 3 = 9)!",
        review: "Each star ⭐ represents a count of 3, because 3 + 3 + 3 = 9!"
      },
      {
        stageNum: 4,
        level: 1,
        levelStageNum: "4 of 5",
        title: "Count 3D Block Row",
        subtitle: "Level 1: Counting • 📦 3D Spatial",
        prompt: "Count the total number of unit cubes in this straight row:",
        type: "spatial-3d",
        heightMap: [
          [1, 1, 1, 1]
        ],
        totalCubes: 4,
        hint: "Count the blocks from left to right: 1, 2, 3, 4!",
        review: "There are 4 wooden unit blocks placed in a single row (1 + 1 + 1 + 1 = 4)!"
      },
      {
        stageNum: 5,
        level: 1,
        levelStageNum: "5 of 5",
        title: "3x3 Counting Grid (1, 2, 3)",
        subtitle: "Level 1: Counting • 🧩 Sudoku Matrix",
        prompt: "Fill the grid so digits 1, 2, and 3 appear once per row and column:",
        type: "sudoku-matrix",
        gridSize: 3,
        symbols: ["1", "2", "3"],
        initialGrid: [
          ["1", "2", "3"],
          ["2", "3", null],
          ["3", null, "2"]
        ],
        solutionGrid: [
          ["1", "2", "3"],
          ["2", "3", "1"],
          ["3", "1", "2"]
        ],
        targetCell: { r: 1, c: 2, answer: "1", explanation: "Row 2 already has 2 and 3, so the missing digit is 1!" },
        hint: "Look at Row 2: it has 2 and 3. The only missing counting number is 1!",
        review: "Each row and column contains counting numbers 1, 2, and 3 without repetition!"
      },

      /* --- Level 2: Addition & Making Target Sums --- */
      {
        stageNum: 6,
        level: 2,
        levelStageNum: "1 of 5",
        title: "Find the Sum of 10",
        subtitle: "Level 2: Addition • 🎴 Card Grid",
        prompt: "Which pair of numbers ADDS UP to 10?",
        type: "cards-grid",
        layout: "2x2",
        cards: [
          { id: "c1", icon: "6 + 4", label: "6 + 4 = 10", isCorrect: true },
          { id: "c2", icon: "5 + 3", label: "5 + 3 = 8", isCorrect: false },
          { id: "c3", icon: "7 + 2", label: "7 + 2 = 9", isCorrect: false },
          { id: "c4", icon: "4 + 4", label: "4 + 4 = 8", isCorrect: false }
        ],
        hint: "Add each pair together: 6 + 4 = 10, 5 + 3 = 8, 7 + 2 = 9, 4 + 4 = 8!",
        review: "6 + 4 = 10! The number bonds of 10 include 6 and 4."
      },
      {
        stageNum: 7,
        level: 2,
        levelStageNum: "2 of 5",
        title: "Complete the Addition Balance",
        subtitle: "Level 2: Addition • ⚖️ Balance Scale",
        prompt: "Left pan has 10 kg. Right pan has 4 kg. Add the missing weight to make 10 kg!",
        type: "balance-scale",
        leftWeights: [10],
        rightWeights: [4],
        availableWeights: [3, 5, 6, 8],
        requiredRightTotal: 10,
        correctWeightToDrop: 6,
        hint: "4 + ? = 10. What number added to 4 makes 10? (10 - 4 = 6)!",
        review: "10 kg on the left equals 4 kg + 6 kg on the right pan (4 + 6 = 10)!"
      },
      {
        stageNum: 8,
        level: 2,
        levelStageNum: "3 of 5",
        title: "Addition Rebus Equation",
        subtitle: "Level 2: Addition • 🔢 Rebus Keypad",
        prompt: "Find the value of Banana 🍌 in this addition puzzle:",
        type: "rebus-keypad",
        equations: [
          { left: ["🍓", "+", "🍓"], right: 8 },
          { left: ["🍓", "+", "🍌"], right: 10 }
        ],
        targetSymbol: "🍌",
        correctAnswer: 6,
        hint: "1. 🍓 + 🍓 = 8 means 🍓 = 4. 2. 4 + 🍌 = 10, so 🍌 = 10 - 4!",
        review: "🍓 = 4. Adding: 4 + 🍌 = 10 ➔ 🍌 = 6!"
      },
      {
        stageNum: 9,
        level: 2,
        levelStageNum: "4 of 5",
        title: "Addition of 3D Towers",
        subtitle: "Level 2: Addition • 📦 3D Spatial",
        prompt: "Tower A has 3 cubes and Tower B has 4 cubes. What is the total sum of cubes?",
        type: "spatial-3d",
        heightMap: [
          [3, 4]
        ],
        totalCubes: 7,
        hint: "Add the two column heights together: 3 cubes + 4 cubes = ?",
        review: "Adding the two towers: 3 + 4 = 7 unit cubes in total!"
      },
      {
        stageNum: 10,
        level: 2,
        levelStageNum: "5 of 5",
        title: "3x3 Addition Matrix Puzzle",
        subtitle: "Level 2: Addition • 🧩 Sudoku Matrix",
        prompt: "Complete the matrix with numbers 2, 4, 6 so each appears once per row/column:",
        type: "sudoku-matrix",
        gridSize: 3,
        symbols: ["2", "4", "6"],
        initialGrid: [
          ["2", "4", "6"],
          ["4", "6", null],
          ["6", null, "4"]
        ],
        solutionGrid: [
          ["2", "4", "6"],
          ["4", "6", "2"],
          ["6", "2", "4"]
        ],
        targetCell: { r: 1, c: 2, answer: "2", explanation: "Row 2 has 4 and 6, so the missing addition term is 2!" },
        hint: "Row 2 contains 4 and 6. Which number from [2, 4, 6] is missing?",
        review: "Each row and column contains 2, 4, and 6 in balance!"
      },

      /* --- Level 3: Subtraction & Missing Differences --- */
      {
        stageNum: 11,
        level: 3,
        levelStageNum: "1 of 5",
        title: "Find the Difference of 5",
        subtitle: "Level 3: Subtraction • 🎴 Card Grid",
        prompt: "Which card shows a SUBTRACTION difference equal to 5?",
        type: "cards-grid",
        layout: "2x2",
        cards: [
          { id: "c1", icon: "9 - 4", label: "9 - 4 = 5", isCorrect: true },
          { id: "c2", icon: "8 - 2", label: "8 - 2 = 6", isCorrect: false },
          { id: "c3", icon: "10 - 7", label: "10 - 7 = 3", isCorrect: false },
          { id: "c4", icon: "6 - 3", label: "6 - 3 = 3", isCorrect: false }
        ],
        hint: "Calculate each subtraction: 9 - 4 = 5, 8 - 2 = 6, 10 - 7 = 3, 6 - 3 = 3!",
        review: "9 - 4 = 5! Subtracting 4 from 9 leaves a difference of 5."
      },
      {
        stageNum: 12,
        level: 3,
        levelStageNum: "2 of 5",
        title: "Subtraction Counterbalance",
        subtitle: "Level 3: Subtraction • ⚖️ Balance Scale",
        prompt: "Left pan has 25 kg. Right pan has 18 kg. What difference weight balances the scale?",
        type: "balance-scale",
        leftWeights: [25],
        rightWeights: [18],
        availableWeights: [5, 6, 7, 9],
        requiredRightTotal: 25,
        correctWeightToDrop: 7,
        hint: "Find the difference: 25 - 18 = 7 kg needed on the right pan!",
        review: "25 kg minus 18 kg = 7 kg. Adding 7 kg balances the scale at 25 kg!"
      },
      {
        stageNum: 13,
        level: 3,
        levelStageNum: "3 of 5",
        title: "Subtraction Rebus Equation",
        subtitle: "Level 3: Subtraction • 🔢 Rebus Keypad",
        prompt: "Find the value of UFO 🛸 in this subtraction equation:",
        type: "rebus-keypad",
        equations: [
          { left: ["🚀", "-", "4"], right: 6 },
          { left: ["🚀", "-", "🛸"], right: 3 }
        ],
        targetSymbol: "🛸",
        correctAnswer: 7,
        hint: "1. 🚀 - 4 = 6 ➔ 🚀 = 10. 2. 10 - 🛸 = 3 ➔ 🛸 = 10 - 3!",
        review: "🚀 = 10. In the second equation, 10 - 🛸 = 3 ➔ 🛸 = 7!"
      },
      {
        stageNum: 14,
        level: 3,
        levelStageNum: "4 of 5",
        title: "Subtracted Hollow 3D Block",
        subtitle: "Level 3: Subtraction • 📦 3D Spatial",
        prompt: "A 3x3 solid base has cubes removed from its corners. Count the remaining cubes:",
        type: "spatial-3d",
        heightMap: [
          [0, 1, 0],
          [1, 1, 1],
          [0, 1, 0]
        ],
        totalCubes: 5,
        hint: "A 3x3 grid has 9 spots minus 4 empty corners: 9 - 4 = ?",
        review: "9 total grid spots minus 4 subtracted corners = 5 unit cubes!"
      },
      {
        stageNum: 15,
        level: 3,
        levelStageNum: "5 of 5",
        title: "3x3 Subtraction Number Matrix",
        subtitle: "Level 3: Subtraction • 🧩 Sudoku Matrix",
        prompt: "Fill the 3x3 matrix with numbers 3, 6, 9 without duplicate per row or column:",
        type: "sudoku-matrix",
        gridSize: 3,
        symbols: ["3", "6", "9"],
        initialGrid: [
          ["3", "6", "9"],
          ["6", "9", null],
          ["9", null, "6"]
        ],
        solutionGrid: [
          ["3", "6", "9"],
          ["6", "9", "3"],
          ["9", "3", "6"]
        ],
        targetCell: { r: 1, c: 2, answer: "3", explanation: "Row 2 has 6 and 9, so the missing number is 3!" },
        hint: "Row 2 contains 6 and 9. What is the missing number from [3, 6, 9]?",
        review: "Every row and column has numbers 3, 6, and 9 (multiples with difference 3)!"
      },

      /* --- Level 4: Multiplication & Equal Arrays --- */
      {
        stageNum: 16,
        level: 4,
        levelStageNum: "1 of 5",
        title: "Multiplication Array (4 × 3)",
        subtitle: "Level 4: Multiplication • 🎴 Card Grid",
        prompt: "Which card represents 4 GROUPS of 3 (4 × 3 = 12)?",
        type: "cards-grid",
        layout: "2x2",
        cards: [
          { id: "c1", icon: "⭐⭐⭐ ⭐⭐⭐ ⭐⭐⭐ ⭐⭐⭐", label: "4 groups of 3 (12)", isCorrect: true },
          { id: "c2", icon: "⭐⭐ ⭐⭐ ⭐⭐", label: "3 groups of 2 (6)", isCorrect: false },
          { id: "c3", icon: "⭐⭐⭐⭐ ⭐⭐⭐⭐", label: "2 groups of 4 (8)", isCorrect: false },
          { id: "c4", icon: "⭐⭐⭐⭐⭐", label: "1 group of 5 (5)", isCorrect: false }
        ],
        hint: "Count 4 equal groups containing 3 stars each: 3 + 3 + 3 + 3 = 12!",
        review: "4 groups of 3 equals 12 (4 × 3 = 12)!"
      },
      {
        stageNum: 17,
        level: 4,
        levelStageNum: "2 of 5",
        title: "Multiplication Weight Balance",
        subtitle: "Level 4: Multiplication • ⚖️ Balance Scale",
        prompt: "Left pan has 24 kg. Right pan has two 8 kg boxes (2 × 8 = 16 kg). Balance the scale!",
        type: "balance-scale",
        leftWeights: [24],
        rightWeights: [8, 8],
        availableWeights: [4, 6, 8, 10],
        requiredRightTotal: 24,
        correctWeightToDrop: 8,
        hint: "24 kg total needed. 3 × 8 = 24 kg! Right pan needs one more 8 kg weight (24 - 16 = 8)!",
        review: "3 groups of 8 kg equal 24 kg (3 × 8 = 24 kg)!"
      },
      {
        stageNum: 18,
        level: 4,
        levelStageNum: "3 of 5",
        title: "Multiplication Picture Rebus",
        subtitle: "Level 4: Multiplication • 🔢 Rebus Keypad",
        prompt: "Find the value of Bear 🐻 in this multiplication puzzle:",
        type: "rebus-keypad",
        equations: [
          { left: ["🦁", "×", "🦁"], right: 36 },
          { left: ["🦁", "×", "🐻"], right: 30 }
        ],
        targetSymbol: "🐻",
        correctAnswer: 5,
        hint: "1. 🦁 × 🦁 = 36 ➔ 🦁 = 6. 2. 6 × 🐻 = 30 ➔ 🐻 = 30 ÷ 6!",
        review: "🦁 = 6. In equation 2: 6 × 🐻 = 30 ➔ 🐻 = 5!"
      },
      {
        stageNum: 19,
        level: 4,
        levelStageNum: "4 of 5",
        title: "3D Grid Array Volume (3 × 3 × 2)",
        subtitle: "Level 4: Multiplication • 📦 3D Spatial",
        prompt: "Count all cubes in this 3x3 array where every column is 2 blocks high (3 × 3 × 2):",
        type: "spatial-3d",
        heightMap: [
          [2, 2, 2],
          [2, 2, 2],
          [2, 2, 2]
        ],
        totalCubes: 18,
        hint: "There are 9 columns (3 × 3), and each column has 2 cubes: 9 × 2 = ?",
        review: "A 3x3 array of height 2 contains 3 × 3 × 2 = 18 unit cubes!"
      },
      {
        stageNum: 20,
        level: 4,
        levelStageNum: "5 of 5",
        title: "4x4 Multiplication Matrix",
        subtitle: "Level 4: Multiplication • 🧩 Sudoku Matrix",
        prompt: "Complete the 4x4 Latin matrix with factors 1, 2, 3, 4 without repetition:",
        type: "sudoku-matrix",
        gridSize: 4,
        symbols: ["1", "2", "3", "4"],
        initialGrid: [
          ["1", "2", "3", "4"],
          ["3", "4", "1", "2"],
          ["2", "1", "4", null],
          ["4", "3", "2", "1"]
        ],
        solutionGrid: [
          ["1", "2", "3", "4"],
          ["3", "4", "1", "2"],
          ["2", "1", "4", "3"],
          ["4", "3", "2", "1"]
        ],
        targetCell: { r: 2, c: 3, answer: "3", explanation: "Row 3 needs 3 to complete numbers 1, 2, 3, 4!" },
        hint: "Row 3 already contains 2, 1, and 4. The missing factor is 3!",
        review: "Digits 1, 2, 3, and 4 appear exactly once in each row and column!"
      },

      /* --- Level 5: Multi-Step Algebra & Operations --- */
      {
        stageNum: 21,
        level: 5,
        levelStageNum: "1 of 5",
        title: "Order of Operations (PEMDAS)",
        subtitle: "Level 5: Algebra • 🎴 Card Grid",
        prompt: "What is the correct answer to: 3 + 4 × 2?",
        type: "cards-grid",
        layout: "2x2",
        cards: [
          { id: "c1", icon: "11", label: "11 (Multiply first: 4×2=8, 3+8=11)", isCorrect: true },
          { id: "c2", icon: "14", label: "14 (3+4=7, 7×2=14)", isCorrect: false },
          { id: "c3", icon: "10", label: "10", isCorrect: false },
          { id: "c4", icon: "24", label: "24", isCorrect: false }
        ],
        hint: "Order of Operations rule: Multiply before you add! 4 × 2 = 8, then 3 + 8 = 11.",
        review: "Multiplication comes before addition: 4 × 2 = 8 ➔ 3 + 8 = 11!"
      },
      {
        stageNum: 22,
        level: 5,
        levelStageNum: "2 of 5",
        title: "Multi-Step Precision Balance",
        subtitle: "Level 5: Algebra • ⚖️ Balance Scale",
        prompt: "Left pan has 48 kg. Right pan has 15 kg + 18 kg (33 kg). Balance the scale!",
        type: "balance-scale",
        leftWeights: [48],
        rightWeights: [15, 18],
        availableWeights: [10, 12, 15, 18],
        requiredRightTotal: 48,
        correctWeightToDrop: 15,
        hint: "Right pan has 15 + 18 = 33 kg. 48 - 33 = 15 kg needed!",
        review: "48 kg on the left equals 15 kg + 18 kg + 15 kg on the right pan (48 kg balance)!"
      },
      {
        stageNum: 23,
        level: 5,
        levelStageNum: "3 of 5",
        title: "Three-Variable Algebraic System",
        subtitle: "Level 5: Algebra • 🔢 Rebus Keypad",
        prompt: "Find the value of Trophy 🏆 in this 3-step algebra system:",
        type: "rebus-keypad",
        equations: [
          { left: ["👑", "+", "👑"], right: 16 },
          { left: ["👑", "×", "💎"], right: 32 },
          { left: ["💎", "+", "🏆"], right: 13 }
        ],
        targetSymbol: "🏆",
        correctAnswer: 9,
        hint: "1. 👑 = 8. 2. 8 × 💎 = 32 ➔ 💎 = 4. 3. 4 + 🏆 = 13 ➔ 🏆 = 13 - 4!",
        review: "👑 = 8, 💎 = 4, and 4 + 🏆 = 13 ➔ 🏆 = 9!"
      },
      {
        stageNum: 24,
        level: 5,
        levelStageNum: "4 of 5",
        title: "Multi-Tier Stepped Pyramid",
        subtitle: "Level 5: Algebra • 📦 3D Spatial",
        prompt: "Count cubes in this 3-tier structure (Base 3x3=9, Mid 2x2=4, Top 1x1=1):",
        type: "spatial-3d",
        heightMap: [
          [1, 1, 1],
          [1, 3, 1],
          [1, 1, 1]
        ],
        totalCubes: 11,
        hint: "8 perimeter cubes of height 1 plus 1 central tower of height 3: 8 + 3 = ?",
        review: "8 base cubes + 3 central column cubes = 11 cubes in total!"
      },
      {
        stageNum: 25,
        level: 5,
        levelStageNum: "5 of 5",
        title: "Grandmaster 4x4 Latin Square",
        subtitle: "Level 5: Algebra • 🧩 Sudoku Matrix",
        prompt: "Complete the master 4x4 Roman numeral matrix (I, II, III, IV) without duplicates:",
        type: "sudoku-matrix",
        gridSize: 4,
        symbols: ["I", "II", "III", "IV"],
        initialGrid: [
          ["I", "II", "III", "IV"],
          ["II", "I", "IV", "III"],
          ["III", "IV", "I", null],
          ["IV", "III", "II", "I"]
        ],
        solutionGrid: [
          ["I", "II", "III", "IV"],
          ["II", "I", "IV", "III"],
          ["III", "IV", "I", "II"],
          ["IV", "III", "II", "I"]
        ],
        targetCell: { r: 2, c: 3, answer: "II", explanation: "Row 3 needs II to complete numerals I, II, III, IV!" },
        hint: "Row 3 contains III, IV, and I. The missing numeral is II!",
        review: "Each row and column holds Roman Numerals I, II, III, and IV without conflict!"
      }
    ]
  },

  /* ==========================================================================
     COURSE 2: 🔬 SCIENCE & NATURE
     ========================================================================== */
  {
    id: "science-course",
    name: "Science & Nature",
    category: "science-course",
    icon: "🔬",
    description: "Explore the natural world step-by-step: Animal Kingdom ➔ Habitats & Biomes ➔ States of Matter ➔ Space Astronomy ➔ Ecosystems & Energy!",
    levelThemes: [
      { level: 1, name: "Animal Kingdom & Traits", icon: "🐾", desc: "Identify animal classifications, physical adaptations, and animal anatomy" },
      { level: 2, name: "Habitats & Earth's Biomes", icon: "🌍", desc: "Explore Forests, Oceans, Deserts, and environmental adaptation" },
      { level: 3, name: "States of Matter & Materials", icon: "⚗️", desc: "Investigate Solids, Liquids, Gases, density, and chemical molecules" },
      { level: 4, name: "Space, Planets & Astronomy", icon: "🌌", desc: "Learn about the Solar System, planetary orbits, lunar phases, and gravity" },
      { level: 5, name: "Ecosystems, Energy & Food Chains", icon: "⚡", desc: "Master photosynthesis, predator-prey chains, and conservation of mass" }
    ],
    stages: [
      /* --- Level 1: Animal Kingdom & Traits --- */
      {
        stageNum: 1,
        level: 1,
        levelStageNum: "1 of 5",
        title: "Flight Adaptation Rule",
        subtitle: "Level 1: Animal Kingdom • 🎴 Card Grid",
        prompt: "Which animal CANNOT fly in the air?",
        type: "cards-grid",
        layout: "2x2",
        cards: [
          { id: "c1", icon: "🦅", label: "Eagle (Flyer)", isCorrect: false },
          { id: "c2", icon: "🦉", label: "Owl (Flyer)", isCorrect: false },
          { id: "c3", icon: "🐘", label: "Elephant (Land Mammal)", isCorrect: true },
          { id: "c4", icon: "🦜", label: "Parrot (Flyer)", isCorrect: false }
        ],
        hint: "Three animals are birds with wings that fly. One is a heavy land mammal!",
        review: "Eagles, Owls, and Parrots have wings for flight. Elephants are land mammals without wings!"
      },
      {
        stageNum: 2,
        level: 1,
        levelStageNum: "2 of 5",
        title: "Animal Mass Balance",
        subtitle: "Level 1: Animal Kingdom • ⚖️ Balance Scale",
        prompt: "A baby tiger on the left pan weighs 8 kg. Right pan has 3 kg. Balance the scale!",
        type: "balance-scale",
        leftWeights: [8],
        rightWeights: [3],
        availableWeights: [2, 4, 5, 6],
        requiredRightTotal: 8,
        correctWeightToDrop: 5,
        hint: "8 kg on the left pan. 8 - 3 = 5 kg needed to balance!",
        review: "8 kg tiger cub balances with 3 kg + 5 kg counterweights!"
      },
      {
        stageNum: 3,
        level: 1,
        levelStageNum: "3 of 5",
        title: "Animal Anatomy: Leg Count",
        subtitle: "Level 1: Animal Kingdom • 🔢 Rebus Keypad",
        prompt: "How many legs does one Duck 🦆 have?",
        type: "rebus-keypad",
        equations: [
          { left: ["🐶", "+", "🐶"], right: 8 },
          { left: ["🐶", "+", "🦆"], right: 6 }
        ],
        targetSymbol: "🦆",
        correctAnswer: 2,
        hint: "Two dogs have 8 legs (🐶 = 4 legs). If 4 + 🦆 = 6 legs, then 🦆 = 6 - 4!",
        review: "Dogs have 4 legs (4 + 4 = 8). 4 + 🦆 = 6 ➔ Ducks have 2 legs!"
      },
      {
        stageNum: 4,
        level: 1,
        levelStageNum: "4 of 5",
        title: "Animal Habitat Enclosure",
        subtitle: "Level 1: Animal Kingdom • 📦 3D Spatial",
        prompt: "Count the unit shelter blocks in this tortoise habitat:",
        type: "spatial-3d",
        heightMap: [
          [2, 1],
          [1, 2]
        ],
        totalCubes: 6,
        hint: "Two corners have 2 blocks, and two corners have 1 block: 2 + 1 + 1 + 2 = ?",
        review: "The tortoise shelter enclosure contains 6 unit blocks!"
      },
      {
        stageNum: 5,
        level: 1,
        levelStageNum: "5 of 5",
        title: "3x3 Animal Classification Grid",
        subtitle: "Level 1: Animal Kingdom • 🧩 Sudoku Matrix",
        prompt: "Place Dog 🐶, Cat 🐱, and Rabbit 🐰 so none repeat per row or column:",
        type: "sudoku-matrix",
        gridSize: 3,
        symbols: ["🐶", "🐱", "🐰"],
        initialGrid: [
          ["🐶", "🐱", "🐰"],
          ["🐱", "🐰", null],
          ["🐰", null, "🐱"]
        ],
        solutionGrid: [
          ["🐶", "🐱", "🐰"],
          ["🐱", "🐰", "🐶"],
          ["🐰", "🐶", "🐱"]
        ],
        targetCell: { r: 1, c: 2, answer: "🐶", explanation: "Row 2 has Cat and Rabbit, so the missing animal is Dog 🐶!" },
        hint: "Row 2 contains 🐱 and 🐰. What is the missing pet from [🐶, 🐱, 🐰]?",
        review: "Each row and column contains Dog, Cat, and Rabbit uniquely!"
      },

      /* --- Level 2: Habitats & Earth's Biomes --- */
      {
        stageNum: 6,
        level: 2,
        levelStageNum: "1 of 5",
        title: "Ocean Marine Habitat",
        subtitle: "Level 2: Habitats • 🎴 Card Grid",
        prompt: "Which creature lives in the OCEAN saltwater habitat?",
        type: "cards-grid",
        layout: "2x2",
        cards: [
          { id: "c1", icon: "🦁", label: "Lion (Savanna)", isCorrect: false },
          { id: "c2", icon: "🐬", label: "Dolphin (Ocean)", isCorrect: true },
          { id: "c3", icon: "🦒", label: "Giraffe (Savanna)", isCorrect: false },
          { id: "c4", icon: "🦊", label: "Fox (Forest)", isCorrect: false }
        ],
        hint: "Look for the marine animal that swims in ocean water and uses a blowhole to breathe!",
        review: "Dolphins are marine mammals that thrive in ocean ecosystems!"
      },
      {
        stageNum: 7,
        level: 2,
        levelStageNum: "2 of 5",
        title: "Polar Ice Mass Balance",
        subtitle: "Level 2: Habitats • ⚖️ Balance Scale",
        prompt: "Left pan has a 16 kg polar glacier ice core. Right pan has 6 kg. Balance the scale!",
        type: "balance-scale",
        leftWeights: [16],
        rightWeights: [6],
        availableWeights: [8, 10, 12, 14],
        requiredRightTotal: 16,
        correctWeightToDrop: 10,
        hint: "16 kg on left. 16 - 6 = 10 kg counterweight needed!",
        review: "16 kg polar ice sample balances with 6 kg + 10 kg counterweights!"
      },
      {
        stageNum: 8,
        level: 2,
        levelStageNum: "3 of 5",
        title: "Biome Plant Algebra",
        subtitle: "Level 2: Habitats • 🔢 Rebus Keypad",
        prompt: "Find the growth unit value of Desert Cactus 🌵:",
        type: "rebus-keypad",
        equations: [
          { left: ["🌲", "+", "🌲"], right: 10 },
          { left: ["🌲", "+", "🌵"], right: 8 }
        ],
        targetSymbol: "🌵",
        correctAnswer: 3,
        hint: "1. 🌲 + 🌲 = 10 ➔ 🌲 = 5. 2. 5 + 🌵 = 8 ➔ 🌵 = 8 - 5!",
        review: "Forest Pine 🌲 = 5. In equation 2: 5 + 🌵 = 8 ➔ Desert Cactus 🌵 = 3!"
      },
      {
        stageNum: 9,
        level: 2,
        levelStageNum: "4 of 5",
        title: "Coral Reef 3D Formations",
        subtitle: "Level 2: Habitats • 📦 3D Spatial",
        prompt: "Count all 3D coral blocks in this underwater reef formation:",
        type: "spatial-3d",
        heightMap: [
          [2, 2],
          [2, 2]
        ],
        totalCubes: 8,
        hint: "A 2x2 grid where every column is 2 layers high: 2 × 4 = ?",
        review: "There are 4 columns of 2 coral blocks each: 4 × 2 = 8 coral reef blocks!"
      },
      {
        stageNum: 10,
        level: 2,
        levelStageNum: "5 of 5",
        title: "3x3 Biome Ecosystem Grid",
        subtitle: "Level 2: Habitats • 🧩 Sudoku Matrix",
        prompt: "Place Forest 🌲, Ocean 🌊, and Desert 🏜️ with no repeats in any row or column:",
        type: "sudoku-matrix",
        gridSize: 3,
        symbols: ["🌲", "🌊", "🏜️"],
        initialGrid: [
          ["🌲", "🌊", "🏜️"],
          ["🌊", "🏜️", null],
          ["🏜️", null, "🌊"]
        ],
        solutionGrid: [
          ["🌲", "🌊", "🏜️"],
          ["🌊", "🏜️", "🌲"],
          ["🏜️", "🌲", "🌊"]
        ],
        targetCell: { r: 1, c: 2, answer: "🌲", explanation: "Row 2 contains Ocean and Desert, so the missing biome is Forest 🌲!" },
        hint: "Row 2 contains 🌊 and 🏜️. Which biome is missing to complete [🌲, 🌊, 🏜️]?",
        review: "Each row and column contains Forest, Ocean, and Desert biomes without duplicate!"
      },

      /* --- Level 3: States of Matter & Materials --- */
      {
        stageNum: 11,
        level: 3,
        levelStageNum: "1 of 5",
        title: "Gaseous State of Matter",
        subtitle: "Level 3: States of Matter • 🎴 Card Grid",
        prompt: "Which item is in the GASEOUS state of matter at room temperature?",
        type: "cards-grid",
        layout: "2x2",
        cards: [
          { id: "c1", icon: "🧊", label: "Ice Cube (Solid)", isCorrect: false },
          { id: "c2", icon: "💧", label: "Water Drop (Liquid)", isCorrect: false },
          { id: "c3", icon: "💨", label: "Water Vapor / Air (Gas)", isCorrect: true },
          { id: "c4", icon: "🪨", label: "Rock (Solid)", isCorrect: false }
        ],
        hint: "Solids hold shape, liquids flow, and gases expand freely into the air!",
        review: "Water vapor and air molecules are in the gaseous state, dispersing freely!"
      },
      {
        stageNum: 12,
        level: 3,
        levelStageNum: "2 of 5",
        title: "Liquid Volume Mass Balance",
        subtitle: "Level 3: States of Matter • ⚖️ Balance Scale",
        prompt: "Left pan has 24 kg chemical beaker. Right pan has 14 kg. Balance the scale!",
        type: "balance-scale",
        leftWeights: [24],
        rightWeights: [14],
        availableWeights: [6, 8, 10, 12],
        requiredRightTotal: 24,
        correctWeightToDrop: 10,
        hint: "24 kg total mass. 24 - 14 = 10 kg counterweight needed!",
        review: "24 kg on the left equals 14 kg + 10 kg on the right pan!"
      },
      {
        stageNum: 13,
        level: 3,
        levelStageNum: "3 of 5",
        title: "Water Molecule Formula (H2O)",
        subtitle: "Level 3: States of Matter • 🔢 Rebus Keypad",
        prompt: "If Hydrogen ⚛️ = 1, what is the atomic mass of Oxygen 🧪 in H2O = 18?",
        type: "rebus-keypad",
        equations: [
          { left: ["🧪", "+", "⚛️", "+", "⚛️"], right: 18 },
          { left: ["⚛️", "+", "⚛️"], right: 2 }
        ],
        targetSymbol: "🧪",
        correctAnswer: 16,
        hint: "Two Hydrogens ⚛️ + ⚛️ = 2. In H2O, 🧪 + 2 = 18 ➔ 🧪 = 18 - 2!",
        review: "Each Hydrogen is 1 (1 + 1 = 2). 🧪 (Oxygen) = 18 - 2 = 16 atomic mass units!"
      },
      {
        stageNum: 14,
        level: 3,
        levelStageNum: "4 of 5",
        title: "Solid Crystal Lattice 3D Model",
        subtitle: "Level 3: States of Matter • 📦 3D Spatial",
        prompt: "Count all unit cubes in this solid crystalline lattice structure:",
        type: "spatial-3d",
        heightMap: [
          [2, 1, 2],
          [1, 2, 1],
          [0, 1, 0]
        ],
        totalCubes: 10,
        hint: "Row 1: 2+1+2=5. Row 2: 1+2+1=4. Row 3: 0+1+0=1. 5 + 4 + 1 = ?",
        review: "The solid crystal lattice contains 10 unit cubes tightly bound together!"
      },
      {
        stageNum: 15,
        level: 3,
        levelStageNum: "5 of 5",
        title: "4x4 States of Matter Matrix",
        subtitle: "Level 3: States of Matter • 🧩 Sudoku Matrix",
        prompt: "Place Solid 🧊, Liquid 💧, Gas 💨, and Plasma ⚡ with no duplicate per row/column:",
        type: "sudoku-matrix",
        gridSize: 4,
        symbols: ["🧊", "💧", "💨", "⚡"],
        initialGrid: [
          ["🧊", "💧", "💨", "⚡"],
          ["💨", "⚡", "🧊", "💧"],
          ["💧", "🧊", "⚡", null],
          ["⚡", "💨", "💧", "🧊"]
        ],
        solutionGrid: [
          ["🧊", "💧", "💨", "⚡"],
          ["💨", "⚡", "🧊", "💧"],
          ["💧", "🧊", "⚡", "💨"],
          ["⚡", "💨", "💧", "🧊"]
        ],
        targetCell: { r: 2, c: 3, answer: "💨", explanation: "Row 3 is missing Gas 💨 to complete the four states of matter!" },
        hint: "Row 3 already contains 💧, 🧊, and ⚡. The missing state of matter is Gas 💨!",
        review: "Every row and column contains Solid, Liquid, Gas, and Plasma uniquely!"
      },

      /* --- Level 4: Space, Planets & Astronomy --- */
      {
        stageNum: 16,
        level: 4,
        levelStageNum: "1 of 5",
        title: "Luminous Star vs Planets",
        subtitle: "Level 4: Astronomy • 🎴 Card Grid",
        prompt: "Which celestial body is a LUMINOUS STAR that generates its own light?",
        type: "cards-grid",
        layout: "2x2",
        cards: [
          { id: "c1", icon: "☀️", label: "The Sun (Star)", isCorrect: true },
          { id: "c2", icon: "🌕", label: "The Moon (Satellite)", isCorrect: false },
          { id: "c3", icon: "🪐", label: "Saturn (Planet)", isCorrect: false },
          { id: "c4", icon: "☄️", label: "Comet (Ice/Dust)", isCorrect: false }
        ],
        hint: "Moons and planets reflect light, but stars generate light via nuclear fusion!",
        review: "The Sun is a glowing star that produces its own heat and light energy!"
      },
      {
        stageNum: 17,
        level: 4,
        levelStageNum: "2 of 5",
        title: "Lunar Gravity Counterbalance",
        subtitle: "Level 4: Astronomy • ⚖️ Balance Scale",
        prompt: "Left pan has 36 kg Earth mass. Right pan has 16 kg + 10 kg. Balance the scale!",
        type: "balance-scale",
        leftWeights: [36],
        rightWeights: [16, 10],
        availableWeights: [8, 10, 12, 14],
        requiredRightTotal: 36,
        correctWeightToDrop: 10,
        hint: "Right pan currently has 16 + 10 = 26 kg. 36 - 26 = 10 kg needed!",
        review: "36 kg on the left equals 16 kg + 10 kg + 10 kg on the right pan!"
      },
      {
        stageNum: 18,
        level: 4,
        levelStageNum: "3 of 5",
        title: "Planetary Orbit Speed Algebra",
        subtitle: "Level 4: Astronomy • 🔢 Rebus Keypad",
        prompt: "Find the orbit velocity value of Sun satellite ☀️:",
        type: "rebus-keypad",
        equations: [
          { left: ["🪐", "+", "🪐"], right: 20 },
          { left: ["🪐", "×", "☀️"], right: 60 }
        ],
        targetSymbol: "☀️",
        correctAnswer: 6,
        hint: "1. 🪐 + 🪐 = 20 ➔ 🪐 = 10. 2. 10 × ☀️ = 60 ➔ ☀️ = 60 ÷ 10!",
        review: "🪐 = 10. In equation 2: 10 × ☀️ = 60 ➔ ☀️ = 6!"
      },
      {
        stageNum: 19,
        level: 4,
        levelStageNum: "4 of 5",
        title: "Orbital Space Station 3D Model",
        subtitle: "Level 4: Astronomy • 📦 3D Spatial",
        prompt: "Count all 3D laboratory modules in this orbital space station:",
        type: "spatial-3d",
        heightMap: [
          [1, 3, 1],
          [3, 2, 3],
          [1, 0, 1]
        ],
        totalCubes: 15,
        hint: "Row 1: 1+3+1=5. Row 2: 3+2+3=8. Row 3: 1+0+1=2. 5 + 8 + 2 = ?",
        review: "There are 15 habitat and lab modules forming the orbital space station!"
      },
      {
        stageNum: 20,
        level: 4,
        levelStageNum: "5 of 5",
        title: "4x4 Celestial Constellation Matrix",
        subtitle: "Level 4: Astronomy • 🧩 Sudoku Matrix",
        prompt: "Place Sun ☀️, Moon 🌙, Star ⭐, and Comet ☄️ without duplicate per row/column:",
        type: "sudoku-matrix",
        gridSize: 4,
        symbols: ["☀️", "🌙", "⭐", "☄️"],
        initialGrid: [
          ["☀️", "🌙", "⭐", "☄️"],
          ["⭐", "☄️", "☀️", "🌙"],
          ["🌙", "☀️", "☄️", null],
          ["☄️", "⭐", "🌙", "☀️"]
        ],
        solutionGrid: [
          ["☀️", "🌙", "⭐", "☄️"],
          ["⭐", "☄️", "☀️", "🌙"],
          ["🌙", "☀️", "☄️", "⭐"],
          ["☄️", "⭐", "🌙", "☀️"]
        ],
        targetCell: { r: 2, c: 3, answer: "⭐", explanation: "Row 3 has 🌙, ☀️, ☄️, so the missing symbol is Star ⭐!" },
        hint: "Row 3 contains 🌙, ☀️, and ☄️. The missing celestial symbol is Star ⭐!",
        review: "Each row and column holds Sun, Moon, Star, and Comet in perfect symmetry!"
      },

      /* --- Level 5: Ecosystems, Energy & Food Chains --- */
      {
        stageNum: 21,
        level: 5,
        levelStageNum: "1 of 5",
        title: "Food Chain Apex Predator",
        subtitle: "Level 5: Ecosystems • 🎴 Card Grid",
        prompt: "Sun ☀️ ➔ Grass 🌾 ➔ Grasshopper 🦗 ➔ Frog 🐸 ➔ ❓. What apex predator tops this chain?",
        type: "cards-grid",
        layout: "2x2",
        cards: [
          { id: "c1", icon: "🦅", label: "Eagle / Hawk (Apex Predator)", isCorrect: true },
          { id: "c2", icon: "🍄", label: "Mushroom (Decomposer)", isCorrect: false },
          { id: "c3", icon: "🥕", label: "Carrot (Producer)", isCorrect: false },
          { id: "c4", icon: "🐜", label: "Ant (Invertebrate)", isCorrect: false }
        ],
        hint: "Look for the top predatory bird of prey that hunts frogs and rodents!",
        review: "Eagles and hawks are apex predators atop the vertebrate food chain!"
      },
      {
        stageNum: 22,
        level: 5,
        levelStageNum: "2 of 5",
        title: "Conservation of Mass Balance",
        subtitle: "Level 5: Ecosystems • ⚖️ Balance Scale",
        prompt: "Left pan has 54 g reactant mass. Right pan has 24 g + 18 g (42 g). Balance the scale!",
        type: "balance-scale",
        leftWeights: [54],
        rightWeights: [24, 18],
        availableWeights: [8, 10, 12, 16],
        requiredRightTotal: 54,
        correctWeightToDrop: 12,
        hint: "Right pan currently has 24 + 18 = 42 g. Law of Conservation of Mass: 54 - 42 = 12 g!",
        review: "By Conservation of Mass: 54 g reactants = 24 g + 18 g + 12 g products!"
      },
      {
        stageNum: 23,
        level: 5,
        levelStageNum: "3 of 5",
        title: "Photosynthesis Energy Equation",
        subtitle: "Level 5: Ecosystems • 🔢 Rebus Keypad",
        prompt: "Find the Glucose Energy units 🍯 produced in photosynthesis:",
        type: "rebus-keypad",
        equations: [
          { left: ["☀️", "+", "☀️"], right: 14 },
          { left: ["💧", "+", "💧"], right: 6 },
          { left: ["☀️", "+", "💧", "+", "🍯"], right: 20 }
        ],
        targetSymbol: "🍯",
        correctAnswer: 10,
        hint: "1. ☀️ = 7. 2. 💧 = 3. 3. 7 + 3 + 🍯 = 20 ➔ 10 + 🍯 = 20 ➔ 🍯 = 10!",
        review: "☀️ = 7, 💧 = 3. 7 + 3 + 🍯 = 20 ➔ 🍯 = 10 units of bio-energy!"
      },
      {
        stageNum: 24,
        level: 5,
        levelStageNum: "4 of 5",
        title: "Solar Energy Concentrator 3D Model",
        subtitle: "Level 5: Ecosystems • 📦 3D Spatial",
        prompt: "Count all 3D solar collector cubes in this renewable energy tower:",
        type: "spatial-3d",
        heightMap: [
          [2, 3, 2],
          [3, 4, 3],
          [2, 0, 2]
        ],
        totalCubes: 21,
        hint: "Sum row heights: (2+3+2) + (3+4+3) + (2+0+2) = 7 + 10 + 4 = ?",
        review: "The renewable solar collector tower contains 21 unit cubes in total!"
      },
      {
        stageNum: 25,
        level: 5,
        levelStageNum: "5 of 5",
        title: "4x4 Science Laboratory Matrix",
        subtitle: "Level 5: Ecosystems • 🧩 Sudoku Matrix",
        prompt: "Place Microscope 🔬, Magnet 🧲, Beaker 🧪, and Telescope 🔭 without duplicate:",
        type: "sudoku-matrix",
        gridSize: 4,
        symbols: ["🔬", "🧲", "🧪", "🔭"],
        initialGrid: [
          ["🔬", "🧲", "🧪", "🔭"],
          ["🧪", "🔭", "🔬", "🧲"],
          ["🧲", "🔬", "🔭", null],
          ["🔭", "🧪", "🧲", "🔬"]
        ],
        solutionGrid: [
          ["🔬", "🧲", "🧪", "🔭"],
          ["🧪", "🔭", "🔬", "🧲"],
          ["🧲", "🔬", "🔭", "🧪"],
          ["🔭", "🧪", "🧲", "🔬"]
        ],
        targetCell: { r: 2, c: 3, answer: "🧪", explanation: "Row 3 needs Beaker 🧪 to complete the lab equipment set!" },
        hint: "Row 3 already contains 🧲, 🔬, and 🔭. The missing apparatus is Beaker 🧪!",
        review: "All four science instruments are placed with zero row/column duplicates!"
      }
    ]
  },

  /* ==========================================================================
     COURSE 3: 💡 APTITUDE & LOGIC
     ========================================================================== */
  {
    id: "aptitude-course",
    name: "Aptitude & Logic",
    category: "aptitude-course",
    icon: "💡",
    description: "Sharpen cognitive reasoning step-by-step: Visual Patterns ➔ 90° Rotations ➔ Multi-Attribute Venn ➔ Mirror Projections ➔ Deductive Syllogisms!",
    levelThemes: [
      { level: 1, name: "Visual Patterns & Color Matching", icon: "🎨", desc: "Recognize color sets, shape attributes, and basic odd-one-out rules" },
      { level: 2, name: "Directional Logic & 90° Rotations", icon: "🔄", desc: "Master clockwise rotations, directional arrows, and compass orientations" },
      { level: 3, name: "Multi-Attribute & Venn Logic", icon: "🎯", desc: "Evaluate dual-condition rules (Color AND Shape) and multi-tier grids" },
      { level: 4, name: "Mirror Symmetry & 3D Projections", icon: "🪞", desc: "Invert horizontal/vertical mirror planes, analyze unfolded nets, and tunnels" },
      { level: 5, name: "Formal Deductive Syllogisms", icon: "🧠", desc: "Deduce transitive logic (If A=B, B=C -> A=C) and master 4x4 Latin squares" }
    ],
    stages: [
      /* --- Level 1: Visual Patterns & Color Matching --- */
      {
        stageNum: 1,
        level: 1,
        levelStageNum: "1 of 5",
        title: "Color & Shape Odd One Out",
        subtitle: "Level 1: Visual Patterns • 🎴 Card Grid",
        prompt: "Which item does NOT belong with the other red shapes?",
        type: "cards-grid",
        layout: "2x2",
        cards: [
          { id: "c1", icon: "🔴", label: "Red Circle", isCorrect: false },
          { id: "c2", icon: "🟥", label: "Red Square", isCorrect: false },
          { id: "c3", icon: "🔺", label: "Red Triangle", isCorrect: false },
          { id: "c4", icon: "🍌", label: "Yellow Banana", isCorrect: true }
        ],
        hint: "Three items are red geometric shapes. One is a yellow fruit!",
        review: "Red Circle, Square, and Triangle are red geometric shapes. The Banana is a yellow fruit!"
      },
      {
        stageNum: 2,
        level: 1,
        levelStageNum: "2 of 5",
        title: "Direct Shape Mass Balance",
        subtitle: "Level 1: Visual Patterns • ⚖️ Balance Scale",
        prompt: "Left pan has an 8 kg red block. Right pan has 3 kg. Balance the scale!",
        type: "balance-scale",
        leftWeights: [8],
        rightWeights: [3],
        availableWeights: [2, 4, 5, 6],
        requiredRightTotal: 8,
        correctWeightToDrop: 5,
        hint: "8 kg on the left pan. 8 - 3 = 5 kg needed on the right!",
        review: "8 kg on the left balances with 3 kg + 5 kg on the right pan!"
      },
      {
        stageNum: 3,
        level: 1,
        levelStageNum: "3 of 5",
        title: "Shape Value Arithmetic",
        subtitle: "Level 1: Visual Patterns • 🔢 Rebus Keypad",
        prompt: "Find the numeric value of Triangle 🔺:",
        type: "rebus-keypad",
        equations: [
          { left: ["🔴", "+", "🔴"], right: 6 },
          { left: ["🔴", "+", "🔺"], right: 7 }
        ],
        targetSymbol: "🔺",
        correctAnswer: 4,
        hint: "1. 🔴 + 🔴 = 6 ➔ 🔴 = 3. 2. 3 + 🔺 = 7 ➔ 🔺 = 7 - 3!",
        review: "🔴 = 3. In equation 2: 3 + 🔺 = 7 ➔ 🔺 = 4!"
      },
      {
        stageNum: 4,
        level: 1,
        levelStageNum: "4 of 5",
        title: "2x2 Unit Block Base",
        subtitle: "Level 1: Visual Patterns • 📦 3D Spatial",
        prompt: "Count the total cubes in this 2x2 flat base:",
        type: "spatial-3d",
        heightMap: [
          [1, 1],
          [1, 1]
        ],
        totalCubes: 4,
        hint: "A 2x2 grid with 1 cube at each position: 1 + 1 + 1 + 1 = ?",
        review: "There are 4 unit cubes arranged in a 2x2 square pattern!"
      },
      {
        stageNum: 5,
        level: 1,
        levelStageNum: "5 of 5",
        title: "3x3 Primary Color Grid",
        subtitle: "Level 1: Visual Patterns • 🧩 Sudoku Matrix",
        prompt: "Place Red 🔴, Blue 🟦, and Yellow 🟡 with no duplicates in any row/column:",
        type: "sudoku-matrix",
        gridSize: 3,
        symbols: ["🔴", "🟦", "🟡"],
        initialGrid: [
          ["🔴", "🟦", "🟡"],
          ["🟦", "🟡", null],
          ["🟡", null, "🟦"]
        ],
        solutionGrid: [
          ["🔴", "🟦", "🟡"],
          ["🟦", "🟡", "🔴"],
          ["🟡", "🔴", "🟦"]
        ],
        targetCell: { r: 1, c: 2, answer: "🔴", explanation: "Row 2 has Blue and Yellow, so the missing color is Red 🔴!" },
        hint: "Row 2 contains 🟦 and 🟡. Which primary color is missing?",
        review: "Each row and column contains Red, Blue, and Yellow primary colors uniquely!"
      },

      /* --- Level 2: Directional Logic & 90° Rotations --- */
      {
        stageNum: 6,
        level: 2,
        levelStageNum: "1 of 5",
        title: "90° Clockwise Arrow Sequence",
        subtitle: "Level 2: Directional Logic • 🎴 Card Grid",
        prompt: "Which arrow comes next in the 90° clockwise sequence?",
        type: "cards-grid",
        layout: "2x2",
        sequenceDisplay: ["⬆️", "➡️", "⬇️", "❓"],
        cards: [
          { id: "c1", icon: "⬆️", label: "Up Arrow", isCorrect: false },
          { id: "c2", icon: "⬅️", label: "Left Arrow", isCorrect: true },
          { id: "c3", icon: "➡️", label: "Right Arrow", isCorrect: false },
          { id: "c4", icon: "⬇️", label: "Down Arrow", isCorrect: false }
        ],
        hint: "The arrow rotates 90° clockwise: Up ➔ Right ➔ Down ➔ Next is Left!",
        review: "Clockwise turns: Up (0°), Right (90°), Down (180°), and LEFT (270°)!"
      },
      {
        stageNum: 7,
        level: 2,
        levelStageNum: "2 of 5",
        title: "Directional Force Balance",
        subtitle: "Level 2: Directional Logic • ⚖️ Balance Scale",
        prompt: "Left pan has 14 kg. Right pan has 6 kg. Add the missing weight to balance!",
        type: "balance-scale",
        leftWeights: [14],
        rightWeights: [6],
        availableWeights: [6, 8, 10, 12],
        requiredRightTotal: 14,
        correctWeightToDrop: 8,
        hint: "14 kg on left. 14 - 6 = 8 kg needed on the right!",
        review: "14 kg on the left equals 6 kg + 8 kg on the right pan!"
      },
      {
        stageNum: 8,
        level: 2,
        levelStageNum: "3 of 5",
        title: "Arrow Value Rebus Equation",
        subtitle: "Level 2: Directional Logic • 🔢 Rebus Keypad",
        prompt: "Find the numeric value of Right Arrow ➡️:",
        type: "rebus-keypad",
        equations: [
          { left: ["⬆️", "+", "⬆️"], right: 10 },
          { left: ["⬆️", "+", "➡️"], right: 12 }
        ],
        targetSymbol: "➡️",
        correctAnswer: 7,
        hint: "1. ⬆️ + ⬆️ = 10 ➔ ⬆️ = 5. 2. 5 + ➡️ = 12 ➔ ➡️ = 12 - 5!",
        review: "⬆️ = 5. In equation 2: 5 + ➡️ = 12 ➔ ➡️ = 7!"
      },
      {
        stageNum: 9,
        level: 2,
        levelStageNum: "4 of 5",
        title: "Rotated 3D L-Shape Block",
        subtitle: "Level 2: Directional Logic • 📦 3D Spatial",
        prompt: "Count the cubes in this 3D L-shape turned 90 degrees:",
        type: "spatial-3d",
        heightMap: [
          [2, 0],
          [1, 1]
        ],
        totalCubes: 4,
        hint: "One vertical pillar has 2 cubes, and two horizontal spots have 1 cube: 2 + 1 + 1 = ?",
        review: "The 3D L-shaped block has 4 cubes in total (2 + 1 + 1 = 4)!"
      },
      {
        stageNum: 10,
        level: 2,
        levelStageNum: "5 of 5",
        title: "3x3 Directional Arrows Grid",
        subtitle: "Level 2: Directional Logic • 🧩 Sudoku Matrix",
        prompt: "Place ⬆️ (Up), ➡️ (Right), ⬇️ (Down) with no duplicate per row or column:",
        type: "sudoku-matrix",
        gridSize: 3,
        symbols: ["⬆️", "➡️", "⬇️"],
        initialGrid: [
          ["⬆️", "➡️", "⬇️"],
          ["➡️", "⬇️", null],
          ["⬇️", null, "➡️"]
        ],
        solutionGrid: [
          ["⬆️", "➡️", "⬇️"],
          ["➡️", "⬇️", "⬆️"],
          ["⬇️", "⬆️", "➡️"]
        ],
        targetCell: { r: 1, c: 2, answer: "⬆️", explanation: "Row 2 has ➡️ and ⬇️, so the missing arrow is ⬆️!" },
        hint: "Row 2 contains ➡️ and ⬇️. What is the missing directional arrow?",
        review: "Each row and column holds ⬆️, ➡️, and ⬇️ in rotational balance!"
      },

      /* --- Level 3: Multi-Attribute & Venn Logic --- */
      {
        stageNum: 11,
        level: 3,
        levelStageNum: "1 of 5",
        title: "Dual-Condition Venn Rule",
        subtitle: "Level 3: Multi-Attribute • 🎴 Card Grid",
        prompt: "Rule: Must be ROUND 🟢 AND RED 🔴. Which item satisfies BOTH rules?",
        type: "cards-grid",
        layout: "2x2",
        cards: [
          { id: "c1", icon: "🟩", label: "Green Square (Not red, not round)", isCorrect: false },
          { id: "c2", icon: "🍎", label: "Red Apple (Round & Red)", isCorrect: true },
          { id: "c3", icon: "🍌", label: "Yellow Banana (Not red)", isCorrect: false },
          { id: "c4", icon: "🚗", label: "Red Toy Car (Not round)", isCorrect: false }
        ],
        hint: "Look for the item that has a circular shape AND is red in color!",
        review: "The Red Apple satisfies both conditions: it is circular in cross-section and red!"
      },
      {
        stageNum: 12,
        level: 3,
        levelStageNum: "2 of 5",
        title: "Multi-Weight Dual Balance",
        subtitle: "Level 3: Multi-Attribute • ⚖️ Balance Scale",
        prompt: "Left pan has 22 kg. Right pan has 8 kg + 5 kg (13 kg). Balance the scale!",
        type: "balance-scale",
        leftWeights: [22],
        rightWeights: [8, 5],
        availableWeights: [6, 7, 9, 11],
        requiredRightTotal: 22,
        correctWeightToDrop: 9,
        hint: "Right pan currently has 8 + 5 = 13 kg. 22 - 13 = 9 kg needed!",
        review: "22 kg on the left balances with 8 kg + 5 kg + 9 kg on the right pan!"
      },
      {
        stageNum: 13,
        level: 3,
        levelStageNum: "3 of 5",
        title: "Multi-Shape Algebra Rebus",
        subtitle: "Level 3: Multi-Attribute • 🔢 Rebus Keypad",
        prompt: "Find the value of Gold Diamond 🔶:",
        type: "rebus-keypad",
        equations: [
          { left: ["🔷", "×", "🔷"], right: 25 },
          { left: ["🔷", "+", "🔶"], right: 14 }
        ],
        targetSymbol: "🔶",
        correctAnswer: 9,
        hint: "1. 🔷 × 🔷 = 25 ➔ 🔷 = 5. 2. 5 + 🔶 = 14 ➔ 🔶 = 14 - 5!",
        review: "🔷 = 5. In equation 2: 5 + 🔶 = 14 ➔ 🔶 = 9!"
      },
      {
        stageNum: 14,
        level: 3,
        levelStageNum: "4 of 5",
        title: "Multi-Tier Stepped Terrace 3D",
        subtitle: "Level 3: Multi-Attribute • 📦 3D Spatial",
        prompt: "Count all unit cubes across these 3 stepped attribute layers:",
        type: "spatial-3d",
        heightMap: [
          [3, 2, 1],
          [2, 2, 1],
          [1, 1, 1]
        ],
        totalCubes: 14,
        hint: "Sum by rows: (3+2+1) + (2+2+1) + (1+1+1) = 6 + 5 + 3 = ?",
        review: "Row 1 (6 cubes) + Row 2 (5 cubes) + Row 3 (3 cubes) = 14 cubes in total!"
      },
      {
        stageNum: 15,
        level: 3,
        levelStageNum: "5 of 5",
        title: "4x4 Card Suits Matrix",
        subtitle: "Level 3: Multi-Attribute • 🧩 Sudoku Matrix",
        prompt: "Place Heart ♥️, Diamond ♦️, Club ♣️, Spade ♠️ without duplicate per row/column:",
        type: "sudoku-matrix",
        gridSize: 4,
        symbols: ["♥️", "♦️", "♣️", "♠️"],
        initialGrid: [
          ["♥️", "♦️", "♣️", "♠️"],
          ["♣️", "♠️", "♥️", "♦️"],
          ["♦️", "♥️", "♠️", null],
          ["♠️", "♣️", "♦️", "♥️"]
        ],
        solutionGrid: [
          ["♥️", "♦️", "♣️", "♠️"],
          ["♣️", "♠️", "♥️", "♦️"],
          ["♦️", "♥️", "♠️", "♣️"],
          ["♠️", "♣️", "♦️", "♥️"]
        ],
        targetCell: { r: 2, c: 3, answer: "♣️", explanation: "Row 3 already has ♦️, ♥️, ♠️, so the missing suit is Club ♣️!" },
        hint: "Row 3 contains ♦️, ♥️, and ♠️. What is the missing card suit?",
        review: "Every row and column contains Heart, Diamond, Club, and Spade uniquely!"
      },

      /* --- Level 4: Mirror Symmetry & 3D Projections --- */
      {
        stageNum: 16,
        level: 4,
        levelStageNum: "1 of 5",
        title: "Vertical Mirror Reflection",
        subtitle: "Level 4: Mirror Symmetry • 🎴 Card Grid",
        prompt: "What is the correct horizontal mirror reflection of pointing left (👈)?",
        type: "cards-grid",
        layout: "2x2",
        cards: [
          { id: "c1", icon: "👈", label: "Point Left", isCorrect: false },
          { id: "c2", icon: "👉", label: "Point Right", isCorrect: true },
          { id: "c3", icon: "👆", label: "Point Up", isCorrect: false },
          { id: "c4", icon: "👇", label: "Point Down", isCorrect: false }
        ],
        hint: "A vertical mirror flips horizontal directions: Left becomes Right!",
        review: "The mirror reflection of pointing left (👈) is pointing right (👉)!"
      },
      {
        stageNum: 17,
        level: 4,
        levelStageNum: "2 of 5",
        title: "Symmetrical Pan Balance",
        subtitle: "Level 4: Mirror Symmetry • ⚖️ Balance Scale",
        prompt: "Left pan has 36 kg. Right pan has 14 kg + 8 kg (22 kg). Balance the scale!",
        type: "balance-scale",
        leftWeights: [36],
        rightWeights: [14, 8],
        availableWeights: [10, 12, 14, 18],
        requiredRightTotal: 36,
        correctWeightToDrop: 14,
        hint: "Right pan currently has 14 + 8 = 22 kg. 36 - 22 = 14 kg needed!",
        review: "36 kg on the left equals 14 kg + 8 kg + 14 kg on the right pan!"
      },
      {
        stageNum: 18,
        level: 4,
        levelStageNum: "3 of 5",
        title: "Symmetrical Key & Lock Rebus",
        subtitle: "Level 4: Mirror Symmetry • 🔢 Rebus Keypad",
        prompt: "Find the value of Door 🚪 in this symmetrical equation:",
        type: "rebus-keypad",
        equations: [
          { left: ["🔑", "+", "🔑"], right: 16 },
          { left: ["🔑", "×", "🚪"], right: 48 }
        ],
        targetSymbol: "🚪",
        correctAnswer: 6,
        hint: "1. 🔑 + 🔑 = 16 ➔ 🔑 = 8. 2. 8 × 🚪 = 48 ➔ 🚪 = 48 ÷ 8!",
        review: "🔑 = 8. In equation 2: 8 × 🚪 = 48 ➔ 🚪 = 6!"
      },
      {
        stageNum: 19,
        level: 4,
        levelStageNum: "4 of 5",
        title: "Symmetrical 3D Bridge Arch",
        subtitle: "Level 4: Mirror Symmetry • 📦 3D Spatial",
        prompt: "Count all cubes forming this symmetrical tunnel archway:",
        type: "spatial-3d",
        heightMap: [
          [3, 3, 3],
          [3, 0, 3],
          [1, 0, 1]
        ],
        totalCubes: 17,
        hint: "Row 1 has 3+3+3 = 9. Row 2 has 3+0+3 = 6. Row 3 has 1+0+1 = 2. 9 + 6 + 2 = ?",
        review: "There are 17 unit cubes forming the symmetrical bridge arch!"
      },
      {
        stageNum: 20,
        level: 4,
        levelStageNum: "5 of 5",
        title: "4x4 Geometric Latin Square",
        subtitle: "Level 4: Mirror Symmetry • 🧩 Sudoku Matrix",
        prompt: "Place 🔴, 🟦, 🟡, 🟢 without duplicate per row or column:",
        type: "sudoku-matrix",
        gridSize: 4,
        symbols: ["🔴", "🟦", "🟡", "🟢"],
        initialGrid: [
          ["🔴", "🟦", "🟡", "🟢"],
          ["🟡", "🟢", "🔴", "🟦"],
          ["🟦", "🔴", "🟢", null],
          ["🟢", "🟡", "🟦", "🔴"]
        ],
        solutionGrid: [
          ["🔴", "🟦", "🟡", "🟢"],
          ["🟡", "🟢", "🔴", "🟦"],
          ["🟦", "🔴", "🟢", "🟡"],
          ["🟢", "🟡", "🟦", "🔴"]
        ],
        targetCell: { r: 2, c: 3, answer: "🟡", explanation: "Row 3 already has 🟦, 🔴, 🟢, so the missing color is Yellow 🟡!" },
        hint: "Row 3 contains 🟦, 🔴, and 🟢. What is the missing color?",
        review: "Each row and column uniquely contains Red, Blue, Yellow, and Green shapes!"
      },

      /* --- Level 5: Formal Deductive Syllogisms --- */
      {
        stageNum: 21,
        level: 5,
        levelStageNum: "1 of 5",
        title: "Formal Deductive Syllogism",
        subtitle: "Level 5: Syllogisms • 🎴 Card Grid",
        prompt: "Rule 1: All Birds have feathers. Rule 2: Owls are Birds. Conclusion?",
        type: "cards-grid",
        layout: "2x2",
        cards: [
          { id: "c1", icon: "🦉🪶", label: "Owls have feathers", isCorrect: true },
          { id: "c2", icon: "🐘🪶", label: "Elephants have feathers", isCorrect: false },
          { id: "c3", icon: "🦉🌊", label: "Owls breathe underwater", isCorrect: false },
          { id: "c4", icon: "🐱🪶", label: "Cats have feathers", isCorrect: false }
        ],
        hint: "By transitive deduction: If Owls are Birds, and all Birds have feathers, then Owls must have feathers!",
        review: "Syllogistic logic: Owls ⊂ Birds ⊂ Feathers ➔ Therefore, Owls have feathers!"
      },
      {
        stageNum: 22,
        level: 5,
        levelStageNum: "2 of 5",
        title: "Master Dynamic Equilibrium",
        subtitle: "Level 5: Syllogisms • ⚖️ Balance Scale",
        prompt: "Left pan has 60 kg. Right pan has 24 kg + 16 kg (40 kg). Balance the scale!",
        type: "balance-scale",
        leftWeights: [60],
        rightWeights: [24, 16],
        availableWeights: [14, 16, 20, 24],
        requiredRightTotal: 60,
        correctWeightToDrop: 20,
        hint: "Right pan currently has 24 + 16 = 40 kg. 60 - 40 = 20 kg needed!",
        review: "60 kg on the left equals 24 kg + 16 kg + 20 kg on the right pan (60 kg balance)!"
      },
      {
        stageNum: 23,
        level: 5,
        levelStageNum: "3 of 5",
        title: "Three-Tier Master Logic Rebus",
        subtitle: "Level 5: Syllogisms • 🔢 Rebus Keypad",
        prompt: "Find the value of Diamond 💎 in this multi-stage system:",
        type: "rebus-keypad",
        equations: [
          { left: ["⚡", "+", "⚡"], right: 18 },
          { left: ["⚡", "×", "🔥"], right: 36 },
          { left: ["🔥", "+", "💎"], right: 15 }
        ],
        targetSymbol: "💎",
        correctAnswer: 11,
        hint: "1. ⚡ = 9. 2. 9 × 🔥 = 36 ➔ 🔥 = 4. 3. 4 + 💎 = 15 ➔ 💎 = 15 - 4!",
        review: "⚡ = 9, 🔥 = 4, and 4 + 💎 = 15 ➔ 💎 = 11!"
      },
      {
        stageNum: 24,
        level: 5,
        levelStageNum: "4 of 5",
        title: "Complex 3D Isometric Fortress",
        subtitle: "Level 5: Syllogisms • 📦 3D Spatial",
        prompt: "Rotate the 3D model and count all cubes including hidden interior columns:",
        type: "spatial-3d",
        heightMap: [
          [4, 2, 4],
          [2, 3, 2],
          [4, 2, 4]
        ],
        totalCubes: 27,
        hint: "Four corner towers of height 4 (16), four wall columns of height 2 (8), and center keep of height 3 (3). 16 + 8 + 3 = ?",
        review: "Corner towers (16) + Wall columns (8) + Center keep (3) = 27 cubes in total!"
      },
      {
        stageNum: 25,
        level: 5,
        levelStageNum: "5 of 5",
        title: "Master 4x4 Cognitive Grid",
        subtitle: "Level 5: Syllogisms • 🧩 Sudoku Matrix",
        prompt: "Complete the master 4x4 matrix with 🌟, 🎯, 🚀, 💎 without conflict:",
        type: "sudoku-matrix",
        gridSize: 4,
        symbols: ["🌟", "🎯", "🚀", "💎"],
        initialGrid: [
          ["🌟", "🎯", "🚀", "💎"],
          ["🚀", "💎", "🌟", "🎯"],
          ["🎯", "🌟", "💎", null],
          ["💎", "🚀", "🎯", "🌟"]
        ],
        solutionGrid: [
          ["🌟", "🎯", "🚀", "💎"],
          ["🚀", "💎", "🌟", "🎯"],
          ["🎯", "🌟", "💎", "🚀"],
          ["💎", "🚀", "🎯", "🌟"]
        ],
        targetCell: { r: 2, c: 3, answer: "🚀", explanation: "Row 3 needs Rocket 🚀 to complete the set without duplicate!" },
        hint: "Row 3 contains 🎯, 🌟, and 💎. The missing symbol is Rocket 🚀!",
        review: "Every row and column holds Star, Target, Rocket, and Diamond without conflict!"
      }
    ]
  }
];
