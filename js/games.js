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
     DEMO COURSE: 🎮 ALL-ENGINES SHOWCASE (Fully Unlocked Sandbox for Testing)
     ========================================================================== */
  {
    id: "demo-course",
    name: "Demo Showcase",
    category: "demo-course",
    icon: "🎮",
    allUnlocked: true,
    description: "Instant testing sandbox featuring all 10 interactive game engines — fully unlocked!",
    levelThemes: [
      { level: 1, name: "Visual & Spoken Interaction (Engines 1–5)", icon: "✨", desc: "Cards Grid, Outline Trace, Memory Cards, Spoken Word & Category Sorting" },
      { level: 2, name: "Logic, Deduction & Physics (Engines 6–10)", icon: "🧠", desc: "Matching Cords, Balance Scale, Rebus Math, 3D Spatial & Sudoku Matrix" }
    ],
    stages: [
      /* --- Level 1: Visual & Spoken Engines --- */
      {
        stageNum: 1,
        level: 1,
        levelStageNum: "1 of 5",
        title: "Engine 1: Odd One Out",
        subtitle: "Demo • 🎴 Card Grid Selection",
        prompt: "Which fruit does NOT belong with the green vegetables?",
        type: "cards-grid",
        layout: "2x2",
        cards: [
          { id: "c1", icon: "🥦", label: "Broccoli", isCorrect: false },
          { id: "c2", icon: "🥒", label: "Cucumber", isCorrect: false },
          { id: "c3", icon: "🥬", label: "Lettuce", isCorrect: false },
          { id: "c4", icon: "🍓", label: "Strawberry (Fruit)", isCorrect: true }
        ],
        hint: "Three items are green vegetables. One is a sweet red berry fruit!",
        review: "The Strawberry is a fruit, while the others are green vegetables!"
      },
      {
        stageNum: 2,
        level: 1,
        levelStageNum: "2 of 5",
        title: "Engine 2: Outline Tracing",
        subtitle: "Demo • ✏️ Outline Tracing Canvas",
        prompt: "Trace along the dashed outline of the golden five-point star:",
        type: "outline-trace",
        shape: "star",
        shapeName: "Five-Point Star",
        brushColor: "#F59E0B",
        hint: "Drag your finger or cursor along the dashed star outline to fill it with color!",
        review: "Awesome! You traced all 5 vertices of the star."
      },
      {
        stageNum: 3,
        level: 1,
        levelStageNum: "3 of 5",
        title: "Engine 3: 3D Memory Card Match",
        subtitle: "Demo • 🎴 Memory Flip & Shuffle",
        prompt: "Memorize card pairs before they flip, then find and match each animal:",
        type: "memory-cards",
        pairs: [
          { id: "p1", icon: "🐶", label: "Puppy", color: "#3B82F6" },
          { id: "p2", icon: "🐱", label: "Kitten", color: "#EC4899" },
          { id: "p3", icon: "🐰", label: "Bunny", color: "#10B981" }
        ],
        hint: "Watch during the 3-second preview: Puppy, Kitten, and Bunny positions!",
        review: "You successfully matched all 3 memory pairs!"
      },
      {
        stageNum: 4,
        level: 1,
        levelStageNum: "4 of 5",
        title: "Engine 4: Spoken Word & Image Select",
        subtitle: "Demo • 🔊 Voiceover Narration",
        prompt: "Listen to the spoken animal name and choose the matching picture:",
        type: "listen-and-choose",
        spokenWord: "Elephant",
        phonetic: "El • e • phant",
        options: [
          { id: "opt1", icon: "🐘", label: "Elephant", isCorrect: true },
          { id: "opt2", icon: "🦁", label: "Lion", isCorrect: false },
          { id: "opt3", icon: "🦒", label: "Giraffe", isCorrect: false },
          { id: "opt4", icon: "🦓", label: "Zebra", isCorrect: false }
        ],
        hint: "The voice spoke 'Elephant'. Select the gentle giant with a long trunk!",
        review: "The Elephant is the largest living land mammal with a flexible trunk!"
      },
      {
        stageNum: 5,
        level: 1,
        levelStageNum: "5 of 5",
        title: "Engine 5: Category Drag & Drop",
        subtitle: "Demo • 🎯 Drag & Sort Zones",
        prompt: "Sort animals into Ocean 🌊 vs Jungle 🌴 habitats:",
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
        hint: "Dolphins and Sharks swim in oceans. Tigers and Monkeys live in jungle forests!",
        review: "Dolphins & Sharks in the Ocean, Tigers & Monkeys in the Jungle!"
      },

      /* --- Level 2: Deduction & STEM Engines --- */
      {
        stageNum: 6,
        level: 2,
        levelStageNum: "1 of 5",
        title: "Engine 6: Connecting Cords",
        subtitle: "Demo • 🔗 Matching Pairs",
        prompt: "Connect each number on the left to its matching star count on the right:",
        type: "matching-pairs",
        pairs: [
          { id: "p1", leftText: "Two", leftIcon: "2️⃣", rightText: "⭐⭐", rightIcon: "2 Stars" },
          { id: "p2", leftText: "Three", leftIcon: "3️⃣", rightText: "⭐⭐⭐", rightIcon: "3 Stars" },
          { id: "p3", leftText: "Four", leftIcon: "4️⃣", rightText: "⭐⭐⭐⭐", rightIcon: "4 Stars" },
          { id: "p4", leftText: "Five", leftIcon: "5️⃣", rightText: "⭐⭐⭐⭐⭐", rightIcon: "5 Stars" }
        ],
        hint: "Connect 2 ➔ 2 Stars, 3 ➔ 3 Stars, 4 ➔ 4 Stars, 5 ➔ 5 Stars!",
        review: "Two = 2, Three = 3, Four = 4, and Five = 5!"
      },
      {
        stageNum: 7,
        level: 2,
        levelStageNum: "2 of 5",
        title: "Engine 7: Balance Scale Physics",
        subtitle: "Demo • ⚖️ Balance Scale Physics",
        prompt: "Left pan has 10 kg. Right pan has 4 kg. Add the missing weight to balance:",
        type: "balance-scale",
        leftWeights: [10],
        rightWeights: [4],
        availableWeights: [3, 5, 6, 8],
        requiredRightTotal: 10,
        correctWeightToDrop: 6,
        hint: "4 + ? = 10. You need a 6 kg weight on the right pan!",
        review: "4 kg + 6 kg = 10 kg balances the scale!"
      },
      {
        stageNum: 8,
        level: 2,
        levelStageNum: "3 of 5",
        title: "Engine 8: Rebus Math Keypad",
        subtitle: "Demo • 🔢 Picture Equations",
        prompt: "Find the value of Banana 🍌 in this picture equation:",
        type: "rebus-keypad",
        equations: [
          { left: ["🍓", "+", "🍓"], right: 8 },
          { left: ["🍓", "+", "🍌"], right: 10 }
        ],
        targetSymbol: "🍌",
        correctAnswer: 6,
        hint: "1. 🍓 + 🍓 = 8 ➔ 🍓 = 4. 2. 4 + 🍌 = 10 ➔ 🍌 = 6!",
        review: "🍓 = 4, so 4 + 🍌 = 10 gives 🍌 = 6!"
      },
      {
        stageNum: 9,
        level: 2,
        levelStageNum: "4 of 5",
        title: "Engine 9: 3D Isometric Projection",
        subtitle: "Demo • 📦 3D Spatial Geometry",
        prompt: "Rotate and count all unit cubes in this 3D structure:",
        type: "spatial-3d",
        heightMap: [
          [2, 1],
          [1, 2]
        ],
        totalCubes: 6,
        hint: "Count the columns: (2 + 1) + (1 + 2) = 6 cubes!",
        review: "There are 6 unit cubes in this 3D block arrangement!"
      },
      {
        stageNum: 10,
        level: 2,
        levelStageNum: "5 of 5",
        title: "Engine 10: Deductive Sudoku Matrix",
        subtitle: "Demo • 🧩 Deductive Grid",
        prompt: "Place 🔴, 🟦, and 🟡 so none repeat in any row or column:",
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
        hint: "Row 2 contains 🟦 and 🟡. The missing primary color is Red 🔴!",
        review: "Each row and column uniquely contains Red, Blue, and Yellow!"
      }
    ]
  },

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
        title: "Trace the Triangle",
        subtitle: "Level 1: Geometry • ✏️ Outline Trace",
        prompt: "Trace along the dashed outline of the 3-sided triangle:",
        type: "outline-trace",
        shape: "triangle",
        shapeName: "Equilateral Triangle",
        brushColor: "#3B82F6",
        hint: "Follow the 3 straight sides from the top vertex down to the base!",
        review: "Great job! A triangle has 3 vertices and 3 straight sides."
      },
      {
        stageNum: 3,
        level: 1,
        levelStageNum: "3 of 5",
        title: "Memory Match: Counting Pairs",
        subtitle: "Level 1: Counting • 🎴 Memory Cards",
        prompt: "Memorize card pairs before they flip, then find and match each pair:",
        type: "memory-cards",
        pairs: [
          { id: "p1", icon: "🍎🍎🍎", label: "3 Apples", color: "#EF4444" },
          { id: "p2", icon: "⭐⭐⭐⭐", label: "4 Stars", color: "#F59E0B" },
          { id: "p3", icon: "🎈🎈🎈🎈🎈", label: "5 Balloons", color: "#8B5CF6" }
        ],
        hint: "Remember the positions during the 3-second preview: 3 Apples, 4 Stars, 5 Balloons!",
        review: "You matched all counting quantity pairs!"
      },
      {
        stageNum: 4,
        level: 1,
        levelStageNum: "4 of 5",
        title: "Listen & Select: Five Apples",
        subtitle: "Level 1: Counting • 🔊 Spoken Word",
        prompt: "Listen to the spoken quantity and select the matching picture:",
        type: "listen-and-choose",
        spokenWord: "Five Apples",
        phonetic: "Five • Ap-ples",
        options: [
          { id: "opt1", icon: "🍎🍎🍎🍎🍎", label: "5 Apples", isCorrect: true },
          { id: "opt2", icon: "🍎🍎", label: "2 Apples", isCorrect: false },
          { id: "opt3", icon: "⭐⭐⭐", label: "3 Stars", isCorrect: false },
          { id: "opt4", icon: "🚗", label: "1 Car", isCorrect: false }
        ],
        hint: "The voice spoke 'Five Apples'. Tap the group containing 5 red apples!",
        review: "5 Apples is the correct quantity matching the spoken audio!"
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
        title: "Trace Number 8",
        subtitle: "Level 2: Numbers • ✏️ Outline Trace",
        prompt: "Trace along the double-loop outline of the number 8:",
        type: "outline-trace",
        shape: "number-8",
        shapeName: "Number 8",
        brushColor: "#8B5CF6",
        hint: "Start at the top loop and curve around through the center cross into the lower loop!",
        review: "Superb! Number 8 is shaped with two connected symmetrical loops."
      },
      {
        stageNum: 9,
        level: 2,
        levelStageNum: "4 of 5",
        title: "Memory Match: Addition Doubles",
        subtitle: "Level 2: Addition • 🎴 Memory Cards",
        prompt: "Memorize and match the addition equations with their total sums:",
        type: "memory-cards",
        pairs: [
          { id: "p1", icon: "2 + 2", label: "2 + 2 = 4", color: "#3B82F6" },
          { id: "p2", icon: "5 + 5", label: "5 + 5 = 10", color: "#10B981" },
          { id: "p3", icon: "3 + 3", label: "3 + 3 = 6", color: "#F59E0B" }
        ],
        hint: "Remember the doubles: 2+2 makes 4, 3+3 makes 6, and 5+5 makes 10!",
        review: "You matched all addition doubles pairs!"
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
        title: "Listen & Select: Minus Sign",
        subtitle: "Level 3: Subtraction • 🔊 Spoken Word",
        prompt: "Listen to the spoken mathematical operation and select the correct symbol:",
        type: "listen-and-choose",
        spokenWord: "Minus Sign",
        phonetic: "Mi-nus • Sign",
        options: [
          { id: "opt1", icon: "➖", label: "Minus (Subtraction)", isCorrect: true },
          { id: "opt2", icon: "➕", label: "Plus (Addition)", isCorrect: false },
          { id: "opt3", icon: "✖️", label: "Times (Multiply)", isCorrect: false },
          { id: "opt4", icon: "➗", label: "Divide (Division)", isCorrect: false }
        ],
        hint: "The spoken word is 'Minus Sign'. Minus represents subtraction!",
        review: "The minus sign '➖' is used to subtract or find the difference between numbers."
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
        title: "Trace the Diamond",
        subtitle: "Level 4: Geometry • ✏️ Outline Trace",
        prompt: "Trace along the 4 straight symmetrical sides of the diamond:",
        type: "outline-trace",
        shape: "diamond",
        shapeName: "Sparkling Diamond",
        brushColor: "#06B6D4",
        hint: "Trace from the top point down to the sides and join at the bottom tip!",
        review: "Brilliant! A diamond shape (rhombus) has 4 congruent sides and 2 lines of symmetry."
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
        title: "Memory Match: Animal Kingdom",
        subtitle: "Level 1: Animals • 🎴 Memory Cards",
        prompt: "Memorize the animals during preview, then find and match the animal pairs:",
        type: "memory-cards",
        pairs: [
          { id: "p1", icon: "🐬", label: "Dolphin", color: "#0EA5E9" },
          { id: "p2", icon: "🦁", label: "Lion", color: "#F59E0B" },
          { id: "p3", icon: "🦜", label: "Parrot", color: "#10B981" }
        ],
        hint: "Memorize the positions of the Dolphin, Lion, and Parrot!",
        review: "You matched all the animal pairs successfully!"
      },
      {
        stageNum: 4,
        level: 1,
        levelStageNum: "4 of 5",
        title: "Listen & Select: The Elephant",
        subtitle: "Level 1: Animals • 🔊 Spoken Word",
        prompt: "Listen to the spoken animal name and select the matching picture:",
        type: "listen-and-choose",
        spokenWord: "Elephant",
        phonetic: "El • e • phant",
        options: [
          { id: "opt1", icon: "🐘", label: "Elephant", isCorrect: true },
          { id: "opt2", icon: "🦒", label: "Giraffe", isCorrect: false },
          { id: "opt3", icon: "🦁", label: "Lion", isCorrect: false },
          { id: "opt4", icon: "🦓", label: "Zebra", isCorrect: false }
        ],
        hint: "The voice spoke 'Elephant'. Select the gentle giant with a long trunk!",
        review: "The Elephant is the largest living land mammal with a flexible trunk!"
      },
      {
        stageNum: 5,
        level: 1,
        levelStageNum: "5 of 5",
        title: "Trace the Butterfly",
        subtitle: "Level 1: Animals • ✏️ Outline Trace",
        prompt: "Trace along the symmetrical wings of the butterfly:",
        type: "outline-trace",
        shape: "butterfly",
        shapeName: "Butterfly Wings",
        brushColor: "#A855F7",
        hint: "Follow the curved wings on both sides from top to bottom!",
        review: "Marvelous! Butterflies have bilateral symmetry with identical left and right wings."
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
        title: "Trace the Living Heart",
        subtitle: "Level 2: Living Things • ✏️ Outline Trace",
        prompt: "Trace along the curved lobes and pointed base of the heart:",
        type: "outline-trace",
        shape: "heart",
        shapeName: "Living Organism Heart",
        brushColor: "#EC4899",
        hint: "Start at the center notch, curve around the left and right lobes, and meet at the bottom point!",
        review: "Great job! The heart is a muscular organ that pumps oxygen-rich blood through living bodies."
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
        title: "Listen & Select: Solid Ice",
        subtitle: "Level 3: States of Matter • 🔊 Spoken Word",
        prompt: "Listen to the spoken state of matter and choose the matching solid object:",
        type: "listen-and-choose",
        spokenWord: "Ice Cube",
        phonetic: "Ice • Cube",
        options: [
          { id: "opt1", icon: "🧊", label: "Ice Cube (Solid)", isCorrect: true },
          { id: "opt2", icon: "💧", label: "Water Drop (Liquid)", isCorrect: false },
          { id: "opt3", icon: "💨", label: "Steam Vapor (Gas)", isCorrect: false },
          { id: "opt4", icon: "⚡", label: "Plasma Lightning", isCorrect: false }
        ],
        hint: "The spoken word is 'Ice Cube'. Ice is the solid state of water with a fixed crystal shape!",
        review: "Ice cubes are solid water with fixed volume and shape at temperatures below 0°C (32°F)."
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
        title: "Trace the Space Rocket",
        subtitle: "Level 4: Space • ✏️ Outline Trace",
        prompt: "Trace along the nose cone, aerodynamic fuselage, and fins of the rocket:",
        type: "outline-trace",
        shape: "rocket",
        shapeName: "Space Rocket",
        brushColor: "#EF4444",
        hint: "Start at the tip of the nose cone, trace down both sides, and outline the rocket fins!",
        review: "Awesome! Rockets use thrust from burning propulsion fuels to escape Earth's gravity."
      },
      {
        stageNum: 20,
        level: 4,
        levelStageNum: "5 of 5",
        title: "Memory Match: Solar System",
        subtitle: "Level 4: Space • 🎴 Memory Cards",
        prompt: "Memorize the celestial bodies during preview, then find and match each pair:",
        type: "memory-cards",
        pairs: [
          { id: "p1", icon: "☀️", label: "Sun (Star)", color: "#F59E0B" },
          { id: "p2", icon: "🌍", label: "Earth", color: "#3B82F6" },
          { id: "p3", icon: "🌙", label: "Moon", color: "#FBBF24" },
          { id: "p4", icon: "🪐", label: "Saturn", color: "#8B5CF6" }
        ],
        hint: "Memorize the positions of Sun, Earth, Moon, and Saturn during the 3-second preview!",
        review: "You successfully matched all the celestial planet pairs in our solar system!"
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
        title: "Trace the Five-Point Star",
        subtitle: "Level 1: Visuals • ✏️ Outline Trace",
        prompt: "Trace along the 5 glowing vertices of the star:",
        type: "outline-trace",
        shape: "star",
        shapeName: "Five-Point Star",
        brushColor: "#F59E0B",
        hint: "Follow the continuous star path from the top point down and across to each vertex!",
        review: "Awesome! A five-point star has 10 sides and 5 pointed vertices."
      },
      {
        stageNum: 4,
        level: 1,
        levelStageNum: "4 of 5",
        title: "Memory Match: Visual Shapes",
        subtitle: "Level 1: Visuals • 🎴 Memory Cards",
        prompt: "Memorize card pairs before they flip, then find and match each colored shape:",
        type: "memory-cards",
        pairs: [
          { id: "p1", icon: "🔴", label: "Red Circle", color: "#EF4444" },
          { id: "p2", icon: "🔷", label: "Blue Diamond", color: "#3B82F6" },
          { id: "p3", icon: "🟩", label: "Green Square", color: "#10B981" }
        ],
        hint: "Remember the positions: Red Circle, Blue Diamond, and Green Square!",
        review: "You matched all the colored shape pairs successfully!"
      },
      {
        stageNum: 5,
        level: 1,
        levelStageNum: "5 of 5",
        title: "Listen & Select: The Hexagon",
        subtitle: "Level 1: Shapes • 🔊 Spoken Word",
        prompt: "Listen to the spoken polygon name and select the 6-sided geometric shape:",
        type: "listen-and-choose",
        spokenWord: "Hexagon",
        phonetic: "Hex • a • gon",
        options: [
          { id: "opt1", icon: "🛑", label: "Hexagon (6 Sides)", isCorrect: true },
          { id: "opt2", icon: "🔺", label: "Triangle (3 Sides)", isCorrect: false },
          { id: "opt3", icon: "🟦", label: "Square (4 Sides)", isCorrect: false },
          { id: "opt4", icon: "⭐", label: "Star (10 Sides)", isCorrect: false }
        ],
        hint: "The voice spoke 'Hexagon'. A hexagon has exactly 6 straight sides and 6 vertices!",
        review: "A hexagon '🛑' is a polygon with 6 equal sides and 6 internal angles."
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
        title: "Trace the Crescent Moon",
        subtitle: "Level 2: Symbols • ✏️ Outline Trace",
        prompt: "Trace along the curved outer and inner arcs of the crescent moon:",
        type: "outline-trace",
        shape: "moon",
        shapeName: "Crescent Moon",
        brushColor: "#FBBF24",
        hint: "Start at the top tip, follow the outer arc, and curve back along the inner crescent!",
        review: "Splendid! The crescent moon is formed when sunlight illuminates only a sliver of the lunar sphere."
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
        title: "Listen & Select: The Telescope",
        subtitle: "Level 3: Multi-Attribute • 🔊 Spoken Word",
        prompt: "Listen to the spoken equipment name and select the optical astronomy instrument:",
        type: "listen-and-choose",
        spokenWord: "Telescope",
        phonetic: "Tel • e • scope",
        options: [
          { id: "opt1", icon: "🔭", label: "Telescope", isCorrect: true },
          { id: "opt2", icon: "🧭", label: "Compass", isCorrect: false },
          { id: "opt3", icon: "⏳", label: "Hourglass", isCorrect: false },
          { id: "opt4", icon: "🔍", label: "Magnifying Glass", isCorrect: false }
        ],
        hint: "The voice spoke 'Telescope'. It is used by astronomers to view distant stars and planets!",
        review: "A telescope '🔭' is an optical instrument that magnifies distant celestial objects in space."
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
        title: "Memory Match: Aptitude Icons",
        subtitle: "Level 4: Mirror Symmetry • 🎴 Memory Cards",
        prompt: "Memorize the logic symbols during preview, then find and match each pair:",
        type: "memory-cards",
        pairs: [
          { id: "p1", icon: "💡", label: "Idea Bulb", color: "#F59E0B" },
          { id: "p2", icon: "🧩", label: "Puzzle Piece", color: "#3B82F6" },
          { id: "p3", icon: "🎯", label: "Target Bullseye", color: "#EF4444" },
          { id: "p4", icon: "🏆", label: "Trophy Award", color: "#10B981" }
        ],
        hint: "Remember the locations: Idea Bulb, Puzzle Piece, Target, and Trophy!",
        review: "You successfully identified and paired all the logic badge icons!"
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
        title: "Trace the Letter A",
        subtitle: "Level 5: Syllogisms • ✏️ Outline Trace",
        prompt: "Trace along the diagonal legs and horizontal bridge of the letter A:",
        type: "outline-trace",
        shape: "letter-a",
        shapeName: "Capital Letter A",
        brushColor: "#10B981",
        hint: "Start at the bottom-left leg, go up to the apex, trace down the right leg, and cross the middle bar!",
        review: "Awesome! Letter A is the first letter of the alphabet with two slanted diagonals and a crossbar."
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
