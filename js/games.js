/**
 * LogicLike Games Catalog & Educational Curriculum Engine
 * 3 Coherent, Kid-Friendly Courses:
 * 1. 📐 Mathematics (Counting -> Addition -> Subtraction -> Multiplication -> Fractions & Algebra)
 * 2. 🔬 Science & Nature (Animal Habitats & Diets -> Plants & Living Things -> States of Matter -> Solar System -> Human Body & Ecosystems)
 * 3. 💡 Aptitude & Logic (Visual Shapes -> Directions & Opposites -> Multi-Attribute Venn -> 3D Projections -> Deductive Logic)
 *
 * Engines:
 * 🎴 cards-grid (Selection & Odd-One-Out)
 * 🎯 drag-drop-zones (Habitat & Category Sorting)
 * 🔗 matching-pairs (Two-column Connecting Cords)
 * ⚖️ balance-scale (Mass & Physics Balance)
 * 🔢 rebus-keypad (Picture Arithmetic & Equations)
 * 📦 spatial-3d (3D Isometric Spatial Projection)
 * 🧩 sudoku-matrix (Deductive Constraint Grids)
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
    description: "Master math step-by-step: Counting Quantities ➔ Addition ➔ Subtraction ➔ Multiplication ➔ Fractions & Algebra!",
    levelThemes: [
      { level: 1, name: "Counting & Number Quantities (1–10)", icon: "🍎", desc: "Count objects, compare quantities, and understand single-digit numbers" },
      { level: 2, name: "Addition & Making Target Sums", icon: "➕", desc: "Combine numbers, find total sums, and balance addition equations" },
      { level: 3, name: "Subtraction & Missing Differences", icon: "➖", desc: "Take away quantities, find differences, and solve missing-part balances" },
      { level: 4, name: "Multiplication & Equal Arrays", icon: "✖️", desc: "Repeated addition, factor arrays, and equal-group volume calculations" },
      { level: 5, name: "Fractions & Multi-Step Algebra", icon: "🧮", desc: "Halves, quarters, order of operations, and 3-variable substitution systems" }
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
        hint: "Point and count each apple: 1, 2, 3, 4, 5!",
        review: "The third basket has exactly 5 apples (1 + 1 + 1 + 1 + 1 = 5)!"
      },
      {
        stageNum: 2,
        level: 1,
        levelStageNum: "2 of 5",
        title: "Sort Numbers: Small vs Large",
        subtitle: "Level 1: Counting • 🎯 Drag & Sort",
        prompt: "Sort numbers into 'Less than 5' vs '5 or More':",
        type: "drag-drop-zones",
        zones: [
          { id: "less5", title: "Less than 5 (< 5)", icon: "🔹", color: "#3B82F6" },
          { id: "more5", title: "5 or More (≥ 5)", icon: "🔸", color: "#F59E0B" }
        ],
        items: [
          { id: "n2", label: "Number 2", icon: "2️⃣", correctZoneId: "less5" },
          { id: "n3", label: "Number 3", icon: "3️⃣", correctZoneId: "less5" },
          { id: "n7", label: "Number 7", icon: "7️⃣", correctZoneId: "more5" },
          { id: "n9", label: "Number 9", icon: "9️⃣", correctZoneId: "more5" }
        ],
        hint: "Numbers 2 and 3 are smaller than 5. Numbers 7 and 9 are 5 or greater!",
        review: "2 and 3 are < 5. 7 and 9 are ≥ 5!"
      },
      {
        stageNum: 3,
        level: 1,
        levelStageNum: "3 of 5",
        title: "Match Words to Quantities",
        subtitle: "Level 1: Counting • 🔗 Match Pairs",
        prompt: "Connect each number word on the left to its matching visual count on the right:",
        type: "matching-pairs",
        pairs: [
          { id: "p1", leftText: "Two", leftIcon: "2️⃣", rightText: "⭐⭐", rightIcon: "2 Stars" },
          { id: "p2", leftText: "Three", leftIcon: "3️⃣", rightText: "🍎🍎🍎", rightIcon: "3 Apples" },
          { id: "p3", leftText: "Four", leftIcon: "4️⃣", rightText: "🚗🚗🚗🚗", rightIcon: "4 Cars" },
          { id: "p4", leftText: "Five", leftIcon: "5️⃣", rightText: "🎈🎈🎈🎈🎈", rightIcon: "5 Balloons" }
        ],
        hint: "Count the items on the right and connect to the word: Two ➔ 2, Three ➔ 3, Four ➔ 4, Five ➔ 5!",
        review: "Two = 2, Three = 3, Four = 4, and Five = 5!"
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
        title: "Sort Addition by Target Sum",
        subtitle: "Level 2: Addition • 🎯 Drag & Sort",
        prompt: "Sort addition equations into '= 8' vs '= 10':",
        type: "drag-drop-zones",
        zones: [
          { id: "sum8", title: "Equals 8 (= 8)", icon: "🎱", color: "#8B5CF6" },
          { id: "sum10", title: "Equals 10 (= 10)", icon: "🔟", color: "#10B981" }
        ],
        items: [
          { id: "eq1", label: "5 + 3", icon: "➕", correctZoneId: "sum8" },
          { id: "eq2", label: "4 + 4", icon: "➕", correctZoneId: "sum8" },
          { id: "eq3", label: "6 + 4", icon: "➕", correctZoneId: "sum10" },
          { id: "eq4", label: "7 + 3", icon: "➕", correctZoneId: "sum10" }
        ],
        hint: "5 + 3 = 8, 4 + 4 = 8. 6 + 4 = 10, 7 + 3 = 10!",
        review: "5+3 and 4+4 make 8. 6+4 and 7+3 make 10!"
      },
      {
        stageNum: 8,
        level: 2,
        levelStageNum: "3 of 5",
        title: "Match Equations to Sums",
        subtitle: "Level 2: Addition • 🔗 Match Pairs",
        prompt: "Connect each addition problem to its correct sum answer:",
        type: "matching-pairs",
        pairs: [
          { id: "p1", leftText: "3 + 4", leftIcon: "➕", rightText: "7", rightIcon: "7️⃣" },
          { id: "p2", leftText: "5 + 5", leftIcon: "➕", rightText: "10", rightIcon: "🔟" },
          { id: "p3", leftText: "6 + 2", leftIcon: "➕", rightText: "8", rightIcon: "8️⃣" },
          { id: "p4", leftText: "4 + 5", leftIcon: "➕", rightText: "9", rightIcon: "9️⃣" }
        ],
        hint: "3+4=7, 5+5=10, 6+2=8, 4+5=9!",
        review: "3+4=7, 5+5=10, 6+2=8, and 4+5=9!"
      },
      {
        stageNum: 9,
        level: 2,
        levelStageNum: "4 of 5",
        title: "Complete Addition Balance",
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
        stageNum: 10,
        level: 2,
        levelStageNum: "5 of 5",
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
        title: "Sort by Subtraction Result",
        subtitle: "Level 3: Subtraction • 🎯 Drag & Sort",
        prompt: "Sort subtractions into 'Result = 3' vs 'Result = 5':",
        type: "drag-drop-zones",
        zones: [
          { id: "res3", title: "Result is 3 (= 3)", icon: "3️⃣", color: "#3B82F6" },
          { id: "res5", title: "Result is 5 (= 5)", icon: "5️⃣", color: "#EC4899" }
        ],
        items: [
          { id: "s1", label: "8 - 5", icon: "➖", correctZoneId: "res3" },
          { id: "s2", label: "10 - 7", icon: "➖", correctZoneId: "res3" },
          { id: "s3", label: "9 - 4", icon: "➖", correctZoneId: "res5" },
          { id: "s4", label: "12 - 7", icon: "➖", correctZoneId: "res5" }
        ],
        hint: "8 - 5 = 3, 10 - 7 = 3. 9 - 4 = 5, 12 - 7 = 5!",
        review: "8-5 and 10-7 equal 3. 9-4 and 12-7 equal 5!"
      },
      {
        stageNum: 13,
        level: 3,
        levelStageNum: "3 of 5",
        title: "Match Subtractions to Results",
        subtitle: "Level 3: Subtraction • 🔗 Match Pairs",
        prompt: "Connect each subtraction problem on the left to its correct result on the right:",
        type: "matching-pairs",
        pairs: [
          { id: "p1", leftText: "10 - 3", leftIcon: "➖", rightText: "7", rightIcon: "7️⃣" },
          { id: "p2", leftText: "8 - 4", leftIcon: "➖", rightText: "4", rightIcon: "4️⃣" },
          { id: "p3", leftText: "9 - 6", leftIcon: "➖", rightText: "3", rightIcon: "3️⃣" },
          { id: "p4", leftText: "15 - 9", leftIcon: "➖", rightText: "6", rightIcon: "6️⃣" }
        ],
        hint: "10-3=7, 8-4=4, 9-6=3, 15-9=6!",
        review: "10-3=7, 8-4=4, 9-6=3, and 15-9=6!"
      },
      {
        stageNum: 14,
        level: 3,
        levelStageNum: "4 of 5",
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
        title: "Sort Multiples of 3 vs Multiples of 4",
        subtitle: "Level 4: Multiplication • 🎯 Drag & Sort",
        prompt: "Sort numbers into 'Multiples of 3' vs 'Multiples of 4':",
        type: "drag-drop-zones",
        zones: [
          { id: "mult3", title: "Multiples of 3 (3×)", icon: "3️⃣", color: "#3B82F6" },
          { id: "mult4", title: "Multiples of 4 (4×)", icon: "4️⃣", color: "#10B981" }
        ],
        items: [
          { id: "m6", label: "Number 6 (3×2)", icon: "🔢", correctZoneId: "mult3" },
          { id: "m9", label: "Number 9 (3×3)", icon: "🔢", correctZoneId: "mult3" },
          { id: "m8", label: "Number 8 (4×2)", icon: "🔢", correctZoneId: "mult4" },
          { id: "m16", label: "Number 16 (4×4)", icon: "🔢", correctZoneId: "mult4" }
        ],
        hint: "6 and 9 are in the 3 times table. 8 and 16 are in the 4 times table!",
        review: "3×2=6, 3×3=9. 4×2=8, 4×4=16!"
      },
      {
        stageNum: 18,
        level: 4,
        levelStageNum: "3 of 5",
        title: "Match Multiplication Equations",
        subtitle: "Level 4: Multiplication • 🔗 Match Pairs",
        prompt: "Connect each multiplication problem to its correct product on the right:",
        type: "matching-pairs",
        pairs: [
          { id: "p1", leftText: "3 × 4", leftIcon: "✖️", rightText: "12", rightIcon: "1️⃣2️⃣" },
          { id: "p2", leftText: "5 × 5", leftIcon: "✖️", rightText: "25", rightIcon: "2️⃣5️⃣" },
          { id: "p3", leftText: "6 × 2", leftIcon: "✖️", rightText: "12", rightIcon: "1️⃣2️⃣" },
          { id: "p4", leftText: "4 × 5", leftIcon: "✖️", rightText: "20", rightIcon: "2️⃣0️⃣" }
        ],
        hint: "3×4=12, 5×5=25, 6×2=12, 4×5=20!",
        review: "3×4=12, 5×5=25, 6×2=12, and 4×5=20!"
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

      /* --- Level 5: Fractions & Multi-Step Algebra --- */
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
        title: "Sort Fractions: Half vs Quarter",
        subtitle: "Level 5: Algebra • 🎯 Drag & Sort",
        prompt: "Sort representations into 'Half (1/2)' vs 'Quarter (1/4)':",
        type: "drag-drop-zones",
        zones: [
          { id: "half", title: "Half (1/2 or 50%)", icon: "🌗", color: "#6366F1" },
          { id: "quarter", title: "Quarter (1/4 or 25%)", icon: "🌘", color: "#F59E0B" }
        ],
        items: [
          { id: "f1", label: "2 out of 4 slices", icon: "🍕", correctZoneId: "half" },
          { id: "f2", label: "50 out of 100", icon: "💯", correctZoneId: "half" },
          { id: "f3", label: "1 out of 4 slices", icon: "🍕", correctZoneId: "quarter" },
          { id: "f4", label: "25 out of 100", icon: "🪙", correctZoneId: "quarter" }
        ],
        hint: "2/4 and 50/100 are equal to one half (1/2). 1/4 and 25/100 are equal to one quarter (1/4)!",
        review: "2/4 = 1/2 (Half). 1/4 = 25% (Quarter)!"
      },
      {
        stageNum: 23,
        level: 5,
        levelStageNum: "3 of 5",
        title: "Match Fractions to Percentages",
        subtitle: "Level 5: Algebra • 🔗 Match Pairs",
        prompt: "Connect each fraction on the left to its percentage value on the right:",
        type: "matching-pairs",
        pairs: [
          { id: "p1", leftText: "1/2 (One Half)", leftIcon: "🌗", rightText: "50%", rightIcon: "📊" },
          { id: "p2", leftText: "1/4 (One Quarter)", leftIcon: "🌘", rightText: "25%", rightIcon: "📊" },
          { id: "p3", leftText: "3/4 (Three Quarters)", leftIcon: "🌖", rightText: "75%", rightIcon: "📊" },
          { id: "p4", leftText: "1/10 (One Tenth)", leftIcon: "🌑", rightText: "10%", rightIcon: "📊" }
        ],
        hint: "1/2 = 50%, 1/4 = 25%, 3/4 = 75%, 1/10 = 10%!",
        review: "1/2 = 50%, 1/4 = 25%, 3/4 = 75%, and 1/10 = 10%!"
      },
      {
        stageNum: 24,
        level: 5,
        levelStageNum: "4 of 5",
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
     COURSE 2: 🔬 SCIENCE & NATURE (Pure, Authentic Science)
     ========================================================================== */
  {
    id: "science-course",
    name: "Science & Nature",
    category: "science-course",
    icon: "🔬",
    description: "Explore the natural world step-by-step: Animal Habitats & Diets ➔ Plants & Living Things ➔ States of Matter ➔ Space Astronomy ➔ Human Body & Food Chains!",
    levelThemes: [
      { level: 1, name: "Animal Habitats, Diets & Classification", icon: "🐾", desc: "Sort animals into habitats (Ocean vs Land), match diets, and identify mammals" },
      { level: 2, name: "Living vs Non-Living & Plant Life", icon: "🌱", desc: "Classify living organisms, identify plant anatomy (roots, leaves), and life cycles" },
      { level: 3, name: "States of Matter & Physical Materials", icon: "⚗️", desc: "Sort Solids, Liquids, Gases, match melting/freezing changes, and density" },
      { level: 4, name: "Solar System, Planets & Astronomy", icon: "🌌", desc: "Classify Rocky Planets vs Gas Giants, match celestial bodies, and lunar orbits" },
      { level: 5, name: "Human Body & Ecosystem Food Chains", icon: "🫀", desc: "Match vital organs (Heart, Lungs, Brain) and sort Producers, Consumers, Decomposers" }
    ],
    stages: [
      /* --- Level 1: Animal Habitats, Diets & Classification --- */
      {
        stageNum: 1,
        level: 1,
        levelStageNum: "1 of 5",
        title: "Put Animals in their Habitats",
        subtitle: "Level 1: Animals • 🎯 Drag & Sort",
        prompt: "Put the marine animals in the Ocean 🌊 and land animals in the Jungle 🌴:",
        type: "drag-drop-zones",
        zones: [
          { id: "ocean", title: "Ocean Habitat 🌊", icon: "🌊", color: "#0EA5E9" },
          { id: "jungle", title: "Jungle Habitat 🌴", icon: "🌴", color: "#16A34A" }
        ],
        items: [
          { id: "a1", label: "Dolphin", icon: "🐬", correctZoneId: "ocean" },
          { id: "a2", label: "Shark", icon: "🦈", correctZoneId: "ocean" },
          { id: "a3", label: "Tiger", icon: "🐯", correctZoneId: "jungle" },
          { id: "a4", label: "Monkey", icon: "🐒", correctZoneId: "jungle" }
        ],
        hint: "Dolphins and Sharks swim in saltwater oceans. Tigers and Monkeys live in terrestrial jungle forests!",
        review: "Dolphins & Sharks live in the Ocean (🌊). Tigers & Monkeys live in the Jungle (🌴)!"
      },
      {
        stageNum: 2,
        level: 1,
        levelStageNum: "2 of 5",
        title: "Match Animals to their Food",
        subtitle: "Level 1: Animals • 🔗 Match Pairs",
        prompt: "Connect each animal on the left to what it eats on the right:",
        type: "matching-pairs",
        pairs: [
          { id: "p1", leftText: "Rabbit 🐰", leftIcon: "🐰", rightText: "Carrot 🥕 (Herbivore)", rightIcon: "🥕" },
          { id: "p2", leftText: "Monkey 🐒", leftIcon: "🐒", rightText: "Banana 🍌 (Fruit/Leaves)", rightIcon: "🍌" },
          { id: "p3", leftText: "Frog 🐸", leftIcon: "🐸", rightText: "Fly 🪰 (Insectivore)", rightIcon: "🪰" },
          { id: "p4", leftText: "Panda 🐼", leftIcon: "🐼", rightText: "Bamboo 🎋 (Herbivore)", rightIcon: "🎋" }
        ],
        hint: "Rabbits love crunchy carrots, monkeys eat bananas, frogs catch flying insects, and pandas feed on bamboo!",
        review: "Rabbit ➔ Carrot, Monkey ➔ Banana, Frog ➔ Fly, Panda ➔ Bamboo!"
      },
      {
        stageNum: 3,
        level: 1,
        levelStageNum: "3 of 5",
        title: "Mammal Classification Rule",
        subtitle: "Level 1: Animals • 🎴 Card Grid",
        prompt: "Which animal is a MAMMAL that gives birth to live babies and breathes air?",
        type: "cards-grid",
        layout: "2x2",
        cards: [
          { id: "c1", icon: "🐬", label: "Dolphin (Mammal)", isCorrect: true },
          { id: "c2", icon: "🦅", label: "Eagle (Bird - Lays eggs)", isCorrect: false },
          { id: "c3", icon: "🦎", label: "Lizard (Reptile - Lays eggs)", isCorrect: false },
          { id: "c4", icon: "🐸", label: "Frog (Amphibian - Lays eggs)", isCorrect: false }
        ],
        hint: "Eagles, lizards, and frogs lay eggs. Dolphins are marine mammals with live births and lungs!",
        review: "Dolphins are warm-blooded mammals that breathe air using lungs and nurse their calves!"
      },
      {
        stageNum: 4,
        level: 1,
        levelStageNum: "4 of 5",
        title: "Sort Flyers vs Non-Flyers",
        subtitle: "Level 1: Animals • 🎯 Drag & Sort",
        prompt: "Sort animals into 'Can Fly in Air 🪽' vs 'Cannot Fly 🐾':",
        type: "drag-drop-zones",
        zones: [
          { id: "fly", title: "Can Fly 🪽", icon: "🪽", color: "#6366F1" },
          { id: "nofly", title: "Cannot Fly 🐾", icon: "🐾", color: "#D97706" }
        ],
        items: [
          { id: "f1", label: "Eagle", icon: "🦅", correctZoneId: "fly" },
          { id: "f2", label: "Owl", icon: "🦉", correctZoneId: "fly" },
          { id: "f3", label: "Elephant", icon: "🐘", correctZoneId: "nofly" },
          { id: "f4", label: "Lion", icon: "🦁", correctZoneId: "nofly" }
        ],
        hint: "Eagles and owls have wings and feathers for flight. Elephants and lions are land mammals!",
        review: "Eagles and Owls fly in the air. Elephants and Lions live on land!"
      },
      {
        stageNum: 5,
        level: 1,
        levelStageNum: "5 of 5",
        title: "3x3 Animal Classification Grid",
        subtitle: "Level 1: Animals • 🧩 Sudoku Matrix",
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

      /* --- Level 2: Living vs Non-Living & Plant Life --- */
      {
        stageNum: 6,
        level: 2,
        levelStageNum: "1 of 5",
        title: "Living vs Non-Living Things",
        subtitle: "Level 2: Living Things • 🎯 Drag & Sort",
        prompt: "Sort items into 'Living Organisms 🌱' vs 'Non-Living Objects ⚙️':",
        type: "drag-drop-zones",
        zones: [
          { id: "living", title: "Living Organisms 🌱", icon: "🌱", color: "#16A34A" },
          { id: "nonliving", title: "Non-Living Objects ⚙️", icon: "⚙️", color: "#64748B" }
        ],
        items: [
          { id: "l1", label: "Oak Tree (Grows & Breathes)", icon: "🌳", correctZoneId: "living" },
          { id: "l2", label: "Bird (Grows & Reproduces)", icon: "🐦", correctZoneId: "living" },
          { id: "nl1", label: "Granite Rock", icon: "🪨", correctZoneId: "nonliving" },
          { id: "nl2", label: "Toy Car", icon: "🚗", correctZoneId: "nonliving" }
        ],
        hint: "Living things grow, breathe, and reproduce. Rocks and cars are non-living objects!",
        review: "Trees & Birds are living organisms. Rocks & Cars are non-living!"
      },
      {
        stageNum: 7,
        level: 2,
        levelStageNum: "2 of 5",
        title: "Match Plant Parts to Functions",
        subtitle: "Level 2: Living Things • 🔗 Match Pairs",
        prompt: "Connect each plant anatomy part on the left to its biological function on the right:",
        type: "matching-pairs",
        pairs: [
          { id: "p1", leftText: "Roots 🪴", leftIcon: "🪴", rightText: "Absorbs water & minerals from soil", rightIcon: "💧" },
          { id: "p2", leftText: "Stem 🌿", leftIcon: "🌿", rightText: "Transports water & supports the plant", rightIcon: "⬆️" },
          { id: "p3", leftText: "Leaves 🍃", leftIcon: "🍃", rightText: "Makes food using sunlight (Photosynthesis)", rightIcon: "☀️" },
          { id: "p4", leftText: "Flower 🌸", leftIcon: "🌸", rightText: "Produces seeds for reproduction", rightIcon: "🌱" }
        ],
        hint: "Roots absorb water, Stems carry water upward, Leaves capture sunlight, Flowers make seeds!",
        review: "Roots ➔ Water uptake, Stem ➔ Transport, Leaves ➔ Photosynthesis, Flower ➔ Seed reproduction!"
      },
      {
        stageNum: 8,
        level: 2,
        levelStageNum: "3 of 5",
        title: "Plant Anatomy: Water Uptake",
        subtitle: "Level 2: Living Things • 🎴 Card Grid",
        prompt: "Which part of a plant anchors it in the soil and ABSORBS WATER?",
        type: "cards-grid",
        layout: "2x2",
        cards: [
          { id: "c1", icon: "🪴", label: "Roots", isCorrect: true },
          { id: "c2", icon: "🌸", label: "Petals", isCorrect: false },
          { id: "c3", icon: "🍃", label: "Leaves", isCorrect: false },
          { id: "c4", icon: "🪵", label: "Bark", isCorrect: false }
        ],
        hint: "Look underground: roots absorb moisture and vital nutrients from the soil!",
        review: "Plant roots grow deep into the ground to anchor the plant and drink water!"
      },
      {
        stageNum: 9,
        level: 2,
        levelStageNum: "4 of 5",
        title: "Match Baby Animals to Adults",
        subtitle: "Level 2: Living Things • 🔗 Match Pairs",
        prompt: "Connect each baby animal on the left to its adult parent on the right:",
        type: "matching-pairs",
        pairs: [
          { id: "p1", leftText: "Puppy 🐶", leftIcon: "🐶", rightText: "Adult Dog 🐕", rightIcon: "🐕" },
          { id: "p2", leftText: "Kitten 🐱", leftIcon: "🐱", rightText: "Adult Cat 🐈", rightIcon: "🐈" },
          { id: "p3", leftText: "Calf 🐮", leftIcon: "🐮", rightText: "Adult Cow 🐄", rightIcon: "🐄" },
          { id: "p4", leftText: "Tadpole 🐸", leftIcon: "🫧", rightText: "Adult Frog 🐸", rightIcon: "🐸" }
        ],
        hint: "Puppy ➔ Dog, Kitten ➔ Cat, Calf ➔ Cow, Tadpole ➔ Frog!",
        review: "Puppies grow into Dogs, Kittens into Cats, Calves into Cows, and Tadpoles into Frogs!"
      },
      {
        stageNum: 10,
        level: 2,
        levelStageNum: "5 of 5",
        title: "3x3 Plant Kingdom Matrix",
        subtitle: "Level 2: Living Things • 🧩 Sudoku Matrix",
        prompt: "Place Flower 🌸, Tree 🌲, and Leaf 🍃 with no duplicate per row or column:",
        type: "sudoku-matrix",
        gridSize: 3,
        symbols: ["🌸", "🌲", "🍃"],
        initialGrid: [
          ["🌸", "🌲", "🍃"],
          ["🌲", "🍃", null],
          ["🍃", null, "🌲"]
        ],
        solutionGrid: [
          ["🌸", "🌲", "🍃"],
          ["🌲", "🍃", "🌸"],
          ["🍃", "🌸", "🌲"]
        ],
        targetCell: { r: 1, c: 2, answer: "🌸", explanation: "Row 2 contains Tree and Leaf, so the missing plant symbol is Flower 🌸!" },
        hint: "Row 2 contains 🌲 and 🍃. What is the missing botanical symbol?",
        review: "Each row and column holds Flower, Tree, and Leaf without duplication!"
      },

      /* --- Level 3: States of Matter & Physical Materials --- */
      {
        stageNum: 11,
        level: 3,
        levelStageNum: "1 of 5",
        title: "Sort Solids, Liquids, and Gases",
        subtitle: "Level 3: States of Matter • 🎯 Drag & Sort",
        prompt: "Sort each everyday item into its state of matter:",
        type: "drag-drop-zones",
        zones: [
          { id: "solid", title: "Solid 🧊 (Fixed Shape)", icon: "🧊", color: "#3B82F6" },
          { id: "liquid", title: "Liquid 💧 (Flows in Cup)", icon: "💧", color: "#06B6D4" },
          { id: "gas", title: "Gas 💨 (Fills Air)", icon: "💨", color: "#A855F7" }
        ],
        items: [
          { id: "m1", label: "Ice Cube", icon: "🧊", correctZoneId: "solid" },
          { id: "m2", label: "Water", icon: "💧", correctZoneId: "liquid" },
          { id: "m3", label: "Steam / Air", icon: "💨", correctZoneId: "gas" }
        ],
        hint: "Ice is a solid, liquid water flows in a glass, and steam is a gas that disperses into the air!",
        review: "Ice = Solid 🧊, Water = Liquid 💧, Steam = Gas 💨!"
      },
      {
        stageNum: 12,
        level: 3,
        levelStageNum: "2 of 5",
        title: "Match Phase Changes of Water",
        subtitle: "Level 3: States of Matter • 🔗 Match Pairs",
        prompt: "Connect each thermal state change to what happens to water:",
        type: "matching-pairs",
        pairs: [
          { id: "p1", leftText: "Melting ☀️", leftIcon: "☀️", rightText: "Solid Ice turns into Liquid Water (🧊 ➔ 💧)", rightIcon: "💧" },
          { id: "p2", leftText: "Freezing ❄️", leftIcon: "❄️", rightText: "Liquid Water turns into Solid Ice (💧 ➔ 🧊)", rightIcon: "🧊" },
          { id: "p3", leftText: "Evaporation ♨️", leftIcon: "♨️", rightText: "Liquid Water turns into Gas Steam (💧 ➔ 💨)", rightIcon: "💨" },
          { id: "p4", leftText: "Condensation 🌧️", leftIcon: "🌧️", rightText: "Gas Vapor cools into Liquid Rain (💨 ➔ 💧)", rightIcon: "💧" }
        ],
        hint: "Melting: Ice ➔ Water. Freezing: Water ➔ Ice. Evaporation: Water ➔ Steam. Condensation: Vapor ➔ Water drops!",
        review: "Melting (Solid ➔ Liquid), Freezing (Liquid ➔ Solid), Evaporation (Liquid ➔ Gas), Condensation (Gas ➔ Liquid)!"
      },
      {
        stageNum: 13,
        level: 3,
        levelStageNum: "3 of 5",
        title: "Electrical Conductor Material",
        subtitle: "Level 3: States of Matter • 🎴 Card Grid",
        prompt: "Which material is an ELECTRICAL CONDUCTOR that allows electricity to flow?",
        type: "cards-grid",
        layout: "2x2",
        cards: [
          { id: "c1", icon: "🪙", label: "Copper Metal Wire", isCorrect: true },
          { id: "c2", icon: "🪵", label: "Wooden Stick (Insulator)", isCorrect: false },
          { id: "c3", icon: "🧤", label: "Rubber Glove (Insulator)", isCorrect: false },
          { id: "c4", icon: "🥤", label: "Plastic Straw (Insulator)", isCorrect: false }
        ],
        hint: "Metals like copper and aluminum conduct electricity. Wood, rubber, and plastic are insulators!",
        review: "Copper metal is an excellent electrical conductor used in electrical wiring!"
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

      /* --- Level 4: Solar System, Planets & Astronomy --- */
      {
        stageNum: 16,
        level: 4,
        levelStageNum: "1 of 5",
        title: "Rocky Planets vs Gas Giants",
        subtitle: "Level 4: Solar System • 🎯 Drag & Sort",
        prompt: "Sort planets into 'Inner Rocky Planets 🪨' vs 'Outer Gas Giants 🪐':",
        type: "drag-drop-zones",
        zones: [
          { id: "rocky", title: "Inner Rocky Planets 🪨", icon: "🪨", color: "#D97706" },
          { id: "gasgiant", title: "Outer Gas Giants 🪐", icon: "🪐", color: "#8B5CF6" }
        ],
        items: [
          { id: "pl1", label: "Mercury (Rocky)", icon: "☿️", correctZoneId: "rocky" },
          { id: "pl2", label: "Mars (Rocky)", icon: "♂️", correctZoneId: "rocky" },
          { id: "pl3", label: "Jupiter (Gas Giant)", icon: "♃️", correctZoneId: "gasgiant" },
          { id: "pl4", label: "Saturn (Gas Giant)", icon: "🪐", correctZoneId: "gasgiant" }
        ],
        hint: "Mercury, Venus, Earth, Mars are small rocky worlds. Jupiter, Saturn, Uranus, Neptune are giant gas planets!",
        review: "Mercury & Mars are Rocky Planets. Jupiter & Saturn are Gas Giants!"
      },
      {
        stageNum: 17,
        level: 4,
        levelStageNum: "2 of 5",
        title: "Match Celestial Objects",
        subtitle: "Level 4: Solar System • 🔗 Match Pairs",
        prompt: "Connect each celestial body on the left to its unique astronomical feature:",
        type: "matching-pairs",
        pairs: [
          { id: "p1", leftText: "The Sun ☀️", leftIcon: "☀️", rightText: "Center star of our solar system providing light", rightIcon: "🌟" },
          { id: "p2", leftText: "The Earth 🌍", leftIcon: "🌍", rightText: "Habitable planet with liquid oceans & life", rightIcon: "🌊" },
          { id: "p3", leftText: "The Moon 🌕", leftIcon: "🌕", rightText: "Natural satellite orbiting planet Earth", rightIcon: "🛰️" },
          { id: "p4", leftText: "Saturn 🪐", leftIcon: "🪐", rightText: "Giant planet with spectacular icy rings", rightIcon: "💍" }
        ],
        hint: "The Sun is our star, Earth has life and oceans, the Moon orbits Earth, and Saturn has rings!",
        review: "Sun ➔ Star, Earth ➔ Habitable Oceans, Moon ➔ Satellite, Saturn ➔ Rings!"
      },
      {
        stageNum: 18,
        level: 4,
        levelStageNum: "3 of 5",
        title: "The Red Planet Identification",
        subtitle: "Level 4: Solar System • 🎴 Card Grid",
        prompt: "Which planet is known as the 'RED PLANET' due to iron oxide rust on its surface?",
        type: "cards-grid",
        layout: "2x2",
        cards: [
          { id: "c1", icon: "♂️", label: "Mars", isCorrect: true },
          { id: "c2", icon: "♀️", label: "Venus", isCorrect: false },
          { id: "c3", icon: "♆", label: "Neptune (Blue)", isCorrect: false },
          { id: "c4", icon: "☿️", label: "Mercury", isCorrect: false }
        ],
        hint: "Mars is the 4th planet from the Sun, covered in red rusty dust where rovers explore!",
        review: "Mars is called the Red Planet because iron minerals in its soil oxidize (rust) into red dust!"
      },
      {
        stageNum: 19,
        level: 4,
        levelStageNum: "4 of 5",
        title: "Match Earth Seasons to Weather",
        subtitle: "Level 4: Solar System • 🔗 Match Pairs",
        prompt: "Connect each Earth season to its weather caused by Earth's orbital axial tilt:",
        type: "matching-pairs",
        pairs: [
          { id: "p1", leftText: "Summer 🏖️", leftIcon: "🏖️", rightText: "Hot temperatures & longest daylight hours", rightIcon: "☀️" },
          { id: "p2", leftText: "Winter ⛄", leftIcon: "⛄", rightText: "Cold temperatures, frost, snow & shorter days", rightIcon: "❄️" },
          { id: "p3", leftText: "Autumn 🍂", leftIcon: "🍂", rightText: "Leaves turn golden-brown & cool breezes blow", rightIcon: "🍁" },
          { id: "p4", leftText: "Spring 🌷", leftIcon: "🌷", rightText: "Flowers bloom & baby animals are born", rightIcon: "🌸" }
        ],
        hint: "Summer is hot, Winter brings snow, Autumn has falling leaves, and Spring brings fresh flowers!",
        review: "Summer ➔ Hot/Long days, Winter ➔ Snow/Cold, Autumn ➔ Leaves fall, Spring ➔ Flowers bloom!"
      },
      {
        stageNum: 20,
        level: 4,
        levelStageNum: "5 of 5",
        title: "4x4 Celestial Constellation Matrix",
        subtitle: "Level 4: Solar System • 🧩 Sudoku Matrix",
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

      /* --- Level 5: Human Body & Ecosystem Food Chains --- */
      {
        stageNum: 21,
        level: 5,
        levelStageNum: "1 of 5",
        title: "Trophic Levels: Producers & Consumers",
        subtitle: "Level 5: Ecosystems • 🎯 Drag & Sort",
        prompt: "Sort organisms into 'Producers 🌱 (Make Food)' vs 'Consumers 🦁 (Eat Others)':",
        type: "drag-drop-zones",
        zones: [
          { id: "producer", title: "Producers 🌱 (Photosynthesis)", icon: "🌱", color: "#16A34A" },
          { id: "consumer", title: "Consumers 🦁 (Heterotrophs)", icon: "🦁", color: "#EF4444" }
        ],
        items: [
          { id: "e1", label: "Green Grass", icon: "🌾", correctZoneId: "producer" },
          { id: "e2", label: "Oak Tree", icon: "🌳", correctZoneId: "producer" },
          { id: "e3", label: "Lion", icon: "🦁", correctZoneId: "consumer" },
          { id: "e4", label: "Hawk", icon: "🦅", correctZoneId: "consumer" }
        ],
        hint: "Plants (grass, trees) produce food via sunlight. Animals (lions, hawks) consume other organisms!",
        review: "Grass & Trees are Producers (🌱). Lions & Hawks are Consumers (🦁)!"
      },
      {
        stageNum: 22,
        level: 5,
        levelStageNum: "2 of 5",
        title: "Match Human Organs to Functions",
        subtitle: "Level 5: Human Body • 🔗 Match Pairs",
        prompt: "Connect each vital human organ on the left to its biological function on the right:",
        type: "matching-pairs",
        pairs: [
          { id: "p1", leftText: "Heart 🫀", leftIcon: "🫀", rightText: "Pumps oxygen-rich blood throughout the body", rightIcon: "🩸" },
          { id: "p2", leftText: "Lungs 🫁", leftIcon: "🫁", rightText: "Inhales oxygen and exhales carbon dioxide", rightIcon: "💨" },
          { id: "p3", leftText: "Brain 🧠", leftIcon: "🧠", rightText: "Controls thoughts, memories, and body movements", rightIcon: "💡" },
          { id: "p4", leftText: "Stomach 🫄", leftIcon: "🫄", rightText: "Breaks down and digests food nutrients", rightIcon: "🥗" }
        ],
        hint: "Heart pumps blood, Lungs breathe air, Brain controls the nervous system, Stomach digests food!",
        review: "Heart ➔ Blood circulation, Lungs ➔ Respiration, Brain ➔ Nervous control, Stomach ➔ Digestion!"
      },
      {
        stageNum: 23,
        level: 5,
        levelStageNum: "3 of 5",
        title: "Food Chain Apex Predator",
        subtitle: "Level 5: Ecosystems • 🎴 Card Grid",
        prompt: "Sun ☀️ ➔ Grass 🌾 ➔ Grasshopper 🦗 ➔ Frog 🐸 ➔ ❓. What apex predator tops this food chain?",
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
        stageNum: 24,
        level: 5,
        levelStageNum: "4 of 5",
        title: "Match Simple Machines to Everyday Tools",
        subtitle: "Level 5: Physics & Machines • 🔗 Match Pairs",
        prompt: "Connect each simple physics machine on the left to its real-world example on the right:",
        type: "matching-pairs",
        pairs: [
          { id: "p1", leftText: "Lever ⚖️", leftIcon: "⚖️", rightText: "Playground Seesaw", rightIcon: "🎠" },
          { id: "p2", leftText: "Pulley 🪢", leftIcon: "🪢", rightText: "Flagpole hoisting rope", rightIcon: "🚩" },
          { id: "p3", leftText: "Inclined Plane 📐", leftIcon: "📐", rightText: "Wheelchair accessibility ramp", rightIcon: "♿" },
          { id: "p4", leftText: "Wheel & Axle 🎡", leftIcon: "🎡", rightText: "Bicycle steering wheels", rightIcon: "🚲" }
        ],
        hint: "Seesaw = Lever, Flagpole rope = Pulley, Ramp = Inclined Plane, Bicycle = Wheel & Axle!",
        review: "Lever ➔ Seesaw, Pulley ➔ Flagpole, Inclined Plane ➔ Ramp, Wheel & Axle ➔ Bicycle!"
      },
      {
        stageNum: 25,
        level: 5,
        levelStageNum: "5 of 5",
        title: "4x4 Science Laboratory Matrix",
        subtitle: "Level 5: Science Tools • 🧩 Sudoku Matrix",
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
     COURSE 3: 💡 APTITUDE & LOGIC (Cognitive Reasoning)
     ========================================================================== */
  {
    id: "aptitude-course",
    name: "Aptitude & Logic",
    category: "aptitude-course",
    icon: "💡",
    description: "Sharpen cognitive reasoning step-by-step: Visual Patterns ➔ Directional Logic ➔ Multi-Attribute Venn ➔ Mirror Projections ➔ Deductive Syllogisms!",
    levelThemes: [
      { level: 1, name: "Visual Patterns & Shapes", icon: "🎨", desc: "Recognize color sets, classify 3-sided vs 4-sided shapes, and match 2D shapes to real objects" },
      { level: 2, name: "Directional Logic & Opposites", icon: "🔄", desc: "Master 90° clockwise turns, directional sorting, and logical opposites" },
      { level: 3, name: "Multi-Attribute & Venn Logic", icon: "🎯", desc: "Evaluate dual-condition rules (Color AND Shape) and match profession tools" },
      { level: 4, name: "Mirror Symmetry & 3D Projections", icon: "🪞", desc: "Reflect mirror planes, sort symmetrical items, and match 3D objects to 2D shadows" },
      { level: 5, name: "Formal Deductive Syllogisms & Logic", icon: "🧠", desc: "Master transitive logic (A->B->C), match cause to effect, and solve Latin squares" }
    ],
    stages: [
      /* --- Level 1: Visual Patterns & Shapes --- */
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
        title: "Sort Shapes by Number of Sides",
        subtitle: "Level 1: Visual Patterns • 🎯 Drag & Sort",
        prompt: "Sort shapes into '3 Sides (Triangles 🔺)' vs '4 Sides (Squares/Rectangles 🟥)':",
        type: "drag-drop-zones",
        zones: [
          { id: "sides3", title: "3 Sides (Triangles 🔺)", icon: "🔺", color: "#EF4444" },
          { id: "sides4", title: "4 Sides (Quadrilaterals 🟥)", icon: "🟥", color: "#3B82F6" }
        ],
        items: [
          { id: "sh1", label: "Red Triangle", icon: "🔺", correctZoneId: "sides3" },
          { id: "sh2", label: "Right Triangle", icon: "📐", correctZoneId: "sides3" },
          { id: "sh3", label: "Blue Square", icon: "🟦", correctZoneId: "sides4" },
          { id: "sh4", label: "Gold Rectangle", icon: "💳", correctZoneId: "sides4" }
        ],
        hint: "Triangles have 3 straight edges/sides. Squares and rectangles have 4 straight sides!",
        review: "Triangles = 3 sides. Squares & Rectangles = 4 sides!"
      },
      {
        stageNum: 3,
        level: 1,
        levelStageNum: "3 of 5",
        title: "Match 2D Shapes to Everyday Objects",
        subtitle: "Level 1: Visual Patterns • 🔗 Match Pairs",
        prompt: "Connect each geometric shape on the left to its matching everyday object on the right:",
        type: "matching-pairs",
        pairs: [
          { id: "p1", leftText: "Circle ⚪", leftIcon: "⚪", rightText: "Wall Clock ⏰", rightIcon: "⏰" },
          { id: "p2", leftText: "Triangle 🔺", leftIcon: "🔺", rightText: "Pizza Slice 🍕", rightIcon: "🍕" },
          { id: "p3", leftText: "Rectangle ▬", leftIcon: "▬", rightText: "Room Door 🚪", rightIcon: "🚪" },
          { id: "p4", leftText: "Square ⬛", leftIcon: "⬛", rightText: "Game Dice 🎲", rightIcon: "🎲" }
        ],
        hint: "A clock is circular, a pizza slice is triangular, a door is rectangular, and dice faces are square!",
        review: "Circle ➔ Clock, Triangle ➔ Pizza Slice, Rectangle ➔ Door, Square ➔ Dice!"
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

      /* --- Level 2: Directional Logic & Opposites --- */
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
        title: "Sort Directional Arrows",
        subtitle: "Level 2: Directional Logic • 🎯 Drag & Sort",
        prompt: "Sort arrows into 'Pointing Left / Down ↙️' vs 'Pointing Right / Up ↗️':",
        type: "drag-drop-zones",
        zones: [
          { id: "leftdown", title: "Pointing Left / Down ↙️", icon: "↙️", color: "#3B82F6" },
          { id: "rightup", title: "Pointing Right / Up ↗️", icon: "↗️", color: "#10B981" }
        ],
        items: [
          { id: "d1", label: "Left Arrow", icon: "⬅️", correctZoneId: "leftdown" },
          { id: "d2", label: "Down Arrow", icon: "⬇️", correctZoneId: "leftdown" },
          { id: "d3", label: "Right Arrow", icon: "➡️", correctZoneId: "rightup" },
          { id: "d4", label: "Up Arrow", icon: "⬆️", correctZoneId: "rightup" }
        ],
        hint: "Left (⬅️) and Down (⬇️) go into the left/down zone. Right (➡️) and Up (⬆️) go into the right/up zone!",
        review: "Left/Down = ⬅️ ⬇️. Right/Up = ➡️ ⬆️!"
      },
      {
        stageNum: 8,
        level: 2,
        levelStageNum: "3 of 5",
        title: "Match Logical Opposites (Antonyms)",
        subtitle: "Level 2: Directional Logic • 🔗 Match Pairs",
        prompt: "Connect each concept on the left to its direct logical opposite on the right:",
        type: "matching-pairs",
        pairs: [
          { id: "p1", leftText: "Hot 🔥", leftIcon: "🔥", rightText: "Cold 🧊", rightIcon: "🧊" },
          { id: "p2", leftText: "Fast 🏎️", leftIcon: "🏎️", rightText: "Slow 🐢", rightIcon: "🐢" },
          { id: "p3", leftText: "Day / Sun ☀️", leftIcon: "☀️", rightText: "Night / Moon 🌙", rightIcon: "🌙" },
          { id: "p4", leftText: "Heavy 🐘", leftIcon: "🐘", rightText: "Light 🪶", rightIcon: "🪶" }
        ],
        hint: "Opposite of Hot is Cold, Fast is Slow, Day is Night, Heavy is Light!",
        review: "Hot ↔ Cold, Fast ↔ Slow, Day ↔ Night, Heavy ↔ Light!"
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
        title: "Venn Sorting: Red & Fruit",
        subtitle: "Level 3: Multi-Attribute • 🎯 Drag & Sort",
        prompt: "Sort items into 'Red Fruits 🍎' vs 'Other Items':",
        type: "drag-drop-zones",
        zones: [
          { id: "redfruit", title: "Red Fruits 🍎 (Red + Fruit)", icon: "🍓", color: "#DC2626" },
          { id: "other", title: "Other Objects 📦", icon: "📦", color: "#64748B" }
        ],
        items: [
          { id: "v1", label: "Red Strawberry", icon: "🍓", correctZoneId: "redfruit" },
          { id: "v2", label: "Red Cherry", icon: "🍒", correctZoneId: "redfruit" },
          { id: "v3", label: "Red Firetruck (Not a fruit)", icon: "🚒", correctZoneId: "other" },
          { id: "v4", label: "Yellow Banana (Not red)", icon: "🍌", correctZoneId: "other" }
        ],
        hint: "Strawberries and Cherries are both RED AND FRUITS. Firetrucks and Bananas miss one attribute!",
        review: "Strawberries & Cherries are Red Fruits. Firetrucks & Bananas go into Other!"
      },
      {
        stageNum: 13,
        level: 3,
        levelStageNum: "3 of 5",
        title: "Match Professions to Tools",
        subtitle: "Level 3: Multi-Attribute • 🔗 Match Pairs",
        prompt: "Connect each community profession on the left to their specialized equipment tool on the right:",
        type: "matching-pairs",
        pairs: [
          { id: "p1", leftText: "Doctor 👨‍⚕️", leftIcon: "👨‍⚕️", rightText: "Stethoscope 🩺", rightIcon: "🩺" },
          { id: "p2", leftText: "Chef 👨‍🍳", leftIcon: "👨‍🍳", rightText: "Cooking Pan & Spatula 🍳", rightIcon: "🍳" },
          { id: "p3", leftText: "Artist 🎨", leftIcon: "👩‍🎨", rightText: "Paint Palette & Brush 🖌️", rightIcon: "🖌️" },
          { id: "p4", leftText: "Firefighter 👨‍🚒", leftIcon: "👨‍🚒", rightText: "Fire Extinguisher & Hose 🧯", rightIcon: "🧯" }
        ],
        hint: "Doctor ➔ Stethoscope, Chef ➔ Pan, Artist ➔ Paint Brush, Firefighter ➔ Fire Extinguisher!",
        review: "Doctor ➔ Stethoscope, Chef ➔ Pan, Artist ➔ Paintbrush, Firefighter ➔ Extinguisher!"
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
        title: "Sort Symmetrical vs Asymmetrical",
        subtitle: "Level 4: Mirror Symmetry • 🎯 Drag & Sort",
        prompt: "Sort shapes into 'Symmetrical 🦋 (Mirror Line)' vs 'Asymmetrical ✋ (No Mirror Line)':",
        type: "drag-drop-zones",
        zones: [
          { id: "symm", title: "Symmetrical 🦋 (Equal Halves)", icon: "🦋", color: "#10B981" },
          { id: "asymm", title: "Asymmetrical ✋ (Unequal)", icon: "✋", color: "#F59E0B" }
        ],
        items: [
          { id: "sy1", label: "Butterfly", icon: "🦋", correctZoneId: "symm" },
          { id: "sy2", label: "Heart Shape", icon: "❤️", correctZoneId: "symm" },
          { id: "asy1", label: "Letter F", icon: "🔤", correctZoneId: "asymm" },
          { id: "asy2", label: "Human Hand", icon: "✋", correctZoneId: "asymm" }
        ],
        hint: "Butterflies and Hearts can be folded down the center into identical mirror halves. Letter F and Hands cannot!",
        review: "Butterfly & Heart are Symmetrical. Letter F & Hand are Asymmetrical!"
      },
      {
        stageNum: 18,
        level: 4,
        levelStageNum: "3 of 5",
        title: "Match 3D Solids to 2D Shadows",
        subtitle: "Level 4: Mirror Symmetry • 🔗 Match Pairs",
        prompt: "Connect each 3D solid geometry object to the 2D shadow shape it casts directly from top:",
        type: "matching-pairs",
        pairs: [
          { id: "p1", leftText: "Sphere Ball ⚽", leftIcon: "⚽", rightText: "Circle Shadow ⚪", rightIcon: "⚪" },
          { id: "p2", leftText: "Cube Dice 🎲", leftIcon: "🎲", rightText: "Square Shadow ⬛", rightIcon: "⬛" },
          { id: "p3", leftText: "Cone / Party Hat 🍦", leftIcon: "🍦", rightText: "Triangle Side Shadow 🔺", rightIcon: "🔺" },
          { id: "p4", leftText: "Cylinder Tube 🧪", leftIcon: "🧪", rightText: "Rectangle Side Shadow ▬", rightIcon: "▬" }
        ],
        hint: "A sphere casts a circle, a cube casts a square, a cone side casts a triangle, and a cylinder side casts a rectangle!",
        review: "Sphere ➔ Circle, Cube ➔ Square, Cone ➔ Triangle, Cylinder ➔ Rectangle!"
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

      /* --- Level 5: Formal Deductive Syllogisms & Logic Master --- */
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
        title: "Sort Statements: Always vs Never True",
        subtitle: "Level 5: Syllogisms • 🎯 Drag & Sort",
        prompt: "Sort logical statements into 'Always True 🟢' vs 'Never True 🔴':",
        type: "drag-drop-zones",
        zones: [
          { id: "always", title: "Always True 🟢 (Logical Fact)", icon: "🟢", color: "#16A34A" },
          { id: "never", title: "Never True 🔴 (Logical Impossibility)", icon: "🔴", color: "#EF4444" }
        ],
        items: [
          { id: "st1", label: "A square has 4 sides", icon: "🟩", correctZoneId: "always" },
          { id: "st2", label: "Fish live in water", icon: "🐟", correctZoneId: "always" },
          { id: "st3", label: "Triangles have 5 corners", icon: "🔺", correctZoneId: "never" },
          { id: "st4", label: "The Sun rises in the North", icon: "☀️", correctZoneId: "never" }
        ],
        hint: "Squares always have 4 sides and fish need water (Always True). Triangles have 3 corners, not 5 (Never True)!",
        review: "Squares have 4 sides & fish need water = Always True. Triangles have 5 corners = Never True!"
      },
      {
        stageNum: 23,
        level: 5,
        levelStageNum: "3 of 5",
        title: "Match Cause to Logical Effect",
        subtitle: "Level 5: Syllogisms • 🔗 Match Pairs",
        prompt: "Connect each logical CAUSE on the left to its direct EFFECT on the right:",
        type: "matching-pairs",
        pairs: [
          { id: "p1", leftText: "Heavy Rain Pours 🌧️", leftIcon: "🌧️", rightText: "Ground gets wet and puddles form 🌊", rightIcon: "🌊" },
          { id: "p2", leftText: "Sun shines on Ice ☀️", leftIcon: "☀️", rightText: "Ice absorbs heat and melts into water 💧", rightIcon: "💧" },
          { id: "p3", leftText: "Plant gets water & sun 🌱", leftIcon: "🌱", rightText: "Plant grows healthy flowers 🌻", rightIcon: "🌻" },
          { id: "p4", leftText: "Drop a glass on stone 🪨", leftIcon: "🪨", rightText: "Glass shatters and breaks 💥", rightIcon: "💥" }
        ],
        hint: "Rain ➔ Wet ground, Sun on ice ➔ Melting, Water & sun on plant ➔ Growth, Glass on stone ➔ Breaks!",
        review: "Rain ➔ Wet puddles, Sun ➔ Melting, Sun & water ➔ Growth, Stone drop ➔ Breakage!"
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
