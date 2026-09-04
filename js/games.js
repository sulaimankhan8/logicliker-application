/**
 * LogicLike Games Catalog & Content Engine
 * Contains 5 Game Categories with Stage 1, Stage 2, Stage 3, and Stage 4 expanded to 15 full progressive levels each.
 */

export const GAMES_CATALOG = [
  {
    id: "logic-odd-one-out",
    name: "Odd One Out & Cards",
    category: "cards-grid",
    icon: "🔍",
    description: "Identify odd items, complete visual sequences, and classify logic sets.",
    engineType: "cards-grid",
    stages: [
      {
        stageNum: 1,
        title: "Basic Shape & Color Match",
        subtitle: "Stage 1 of 15 • Basic",
        prompt: "Which item does NOT belong with the others?",
        type: "cards-grid",
        layout: "2x2",
        cards: [
          { id: "c1", icon: "🔴", label: "Red Circle", isCorrect: false },
          { id: "c2", icon: "🟥", label: "Red Square", isCorrect: false },
          { id: "c3", icon: "🔺", label: "Red Triangle", isCorrect: false },
          { id: "c4", icon: "🍌", label: "Yellow Banana", isCorrect: true }
        ],
        hint: "Look at the colors! Three items are red geometric shapes, but one is a yellow fruit.",
        review: "The Red Circle, Red Square, and Red Triangle are all red geometric shapes. The Banana is a yellow fruit, making it the odd one out!"
      },
      {
        stageNum: 2,
        title: "Animal Taxonomy & Flight Rule",
        subtitle: "Stage 2 of 15 • Basic",
        prompt: "Which animal cannot fly in the air?",
        type: "cards-grid",
        layout: "2x2",
        cards: [
          { id: "c1", icon: "🦅", label: "Eagle", isCorrect: false },
          { id: "c2", icon: "🦉", label: "Owl", isCorrect: false },
          { id: "c3", icon: "🐘", label: "Elephant", isCorrect: true },
          { id: "c4", icon: "🦜", label: "Parrot", isCorrect: false }
        ],
        hint: "Three of these animals have wings and can fly. One is a heavy land animal!",
        review: "Eagles, Owls, and Parrots are birds with wings. Elephants live on land and cannot fly!"
      },
      {
        stageNum: 3,
        title: "Directional Clockwise Rotation",
        subtitle: "Stage 3 of 15 • Basic",
        prompt: "Which arrow completes the sequence?",
        type: "cards-grid",
        layout: "2x2",
        sequenceDisplay: ["⬆️", "➡️", "⬇️", "❓"],
        cards: [
          { id: "c1", icon: "⬆️", label: "Up Arrow", isCorrect: false },
          { id: "c2", icon: "⬅️", label: "Left Arrow", isCorrect: true },
          { id: "c3", icon: "➡️", label: "Right Arrow", isCorrect: false },
          { id: "c4", icon: "⬇️", label: "Down Arrow", isCorrect: false }
        ],
        hint: "The arrow is turning clockwise: Up ➔ Right ➔ Down ➔ Next is Left!",
        review: "Rotating clockwise by 90 degrees: Up, Right, Down, and next is LEFT (⬅️)!"
      },
      {
        stageNum: 4,
        title: "Multi-Attribute Count Sizing",
        subtitle: "Stage 4 of 15 • Basic",
        prompt: "Which container has an EVEN number of items?",
        type: "cards-grid",
        layout: "2x2",
        cards: [
          { id: "c1", icon: "🍎🍎🍎", label: "3 Apples", isCorrect: false },
          { id: "c2", icon: "⭐", label: "1 Star", isCorrect: false },
          { id: "c3", icon: "🎾🎾🎾🎾", label: "4 Tennis Balls", isCorrect: true },
          { id: "c4", icon: "🎈🎈🎈🎈🎈", label: "5 Balloons", isCorrect: false }
        ],
        hint: "Count the items: 3, 1, 4, 5. An even number can be split equally into 2 groups!",
        review: "3, 1, and 5 are odd numbers. 4 Tennis Balls is an even number (2 + 2)!"
      },
      {
        stageNum: 5,
        title: "Abstract Tool Functionality",
        subtitle: "Stage 5 of 15 • Basic",
        prompt: "Which item is NOT used for writing or drawing?",
        type: "cards-grid",
        layout: "2x2",
        cards: [
          { id: "c1", icon: "✏️", label: "Pencil", isCorrect: false },
          { id: "c2", icon: "🖌️", label: "Paintbrush", isCorrect: false },
          { id: "c3", icon: "🖍️", label: "Crayon", isCorrect: false },
          { id: "c4", icon: "🔨", label: "Hammer", isCorrect: true }
        ],
        hint: "Pencils, paintbrushes, and crayons create art on paper. What does a hammer do?",
        review: "Pencils, paintbrushes, and crayons are stationery tools for drawing. A hammer is a construction tool!"
      },
      {
        stageNum: 6,
        title: "Color Sequence ABAB",
        subtitle: "Stage 6 of 15 • Advanced",
        prompt: "What comes next in the alternating pattern?",
        type: "cards-grid",
        layout: "2x2",
        sequenceDisplay: ["🟢", "🔴", "🟢", "🔴", "❓"],
        cards: [
          { id: "c1", icon: "🟢", label: "Green Circle", isCorrect: true },
          { id: "c2", icon: "🔴", label: "Red Circle", isCorrect: false },
          { id: "c3", icon: "🟡", label: "Yellow Circle", isCorrect: false },
          { id: "c4", icon: "🔵", label: "Blue Circle", isCorrect: false }
        ],
        hint: "The pattern alternates between Green and Red. After Red comes Green!",
        review: "The pattern alternates: Green, Red, Green, Red, GREEN!"
      },
      {
        stageNum: 7,
        title: "90° Geometric Rotation",
        subtitle: "Stage 7 of 15 • Advanced",
        prompt: "Which shape comes next in the 90° rotation sequence?",
        type: "cards-grid",
        layout: "2x2",
        sequenceDisplay: ["📐", "➡️", "📐", "❓"],
        cards: [
          { id: "c1", icon: "📐", label: "Ruler", isCorrect: false },
          { id: "c2", icon: "📐", label: "Rotated 90°", isCorrect: true },
          { id: "c3", icon: "📏", label: "Straight Ruler", isCorrect: false },
          { id: "c4", icon: "✏️", label: "Pencil", isCorrect: false }
        ],
        hint: "Watch the right angle corner turn clockwise by 90 degrees!",
        review: "Rotating the triangle ruler 90° clockwise points the right angle down!"
      },
      {
        stageNum: 8,
        title: "Numerical Doubling Progression",
        subtitle: "Stage 8 of 15 • Advanced",
        prompt: "Find the missing number in the sequence:",
        type: "cards-grid",
        layout: "2x2",
        sequenceDisplay: ["2", "4", "8", "16", "❓"],
        cards: [
          { id: "c1", icon: "20", label: "20", isCorrect: false },
          { id: "c2", icon: "24", label: "24", isCorrect: false },
          { id: "c3", icon: "32", label: "32", isCorrect: true },
          { id: "c4", icon: "64", label: "64", isCorrect: false }
        ],
        hint: "Each number doubles: 2×2=4, 4×2=8, 8×2=16. What is 16 × 2?",
        review: "The sequence doubles each step: 2, 4, 8, 16, 32!"
      },
      {
        stageNum: 9,
        title: "2x2 Geometric Matrix Completion",
        subtitle: "Stage 9 of 15 • Advanced",
        prompt: "Top row: 🔴 🟦 | Bottom row: 🔴 ❓. What fills the missing slot?",
        type: "cards-grid",
        layout: "2x2",
        cards: [
          { id: "c1", icon: "🟦", label: "Blue Square", isCorrect: true },
          { id: "c2", icon: "🔴", label: "Red Circle", isCorrect: false },
          { id: "c3", icon: "🟡", label: "Yellow Star", isCorrect: false },
          { id: "c4", icon: "🟩", label: "Green Square", isCorrect: false }
        ],
        hint: "Look at the columns! Column 1 has Red Circles. Column 2 has Blue Squares!",
        review: "The top row matches the bottom row pattern: Red Circle followed by Blue Square!"
      },
      {
        stageNum: 10,
        title: "3x3 Visual Fruit Matrix",
        subtitle: "Stage 10 of 15 • Advanced",
        prompt: "Each row contains 🍎, 🍌, 🍇. Row 3 has 🍇, 🍎, ❓. What is missing?",
        type: "cards-grid",
        layout: "2x2",
        cards: [
          { id: "c1", icon: "🍎", label: "Apple", isCorrect: false },
          { id: "c2", icon: "🍌", label: "Banana", isCorrect: true },
          { id: "c3", icon: "🍇", label: "Grapes", isCorrect: false },
          { id: "c4", icon: "🍊", label: "Orange", isCorrect: false }
        ],
        hint: "Row 3 already has Grapes and Apple. The missing third fruit is Banana!",
        review: "Row 3 has Grapes and Apple. The missing third fruit is Banana (🍌)!"
      },
      {
        stageNum: 11,
        title: "Food Chain Classification",
        subtitle: "Stage 11 of 15 • Expert",
        prompt: "Which animal is a CARNIVORE (meat-eater)?",
        type: "cards-grid",
        layout: "2x2",
        cards: [
          { id: "c1", icon: "🐰", label: "Rabbit (Herbivore)", isCorrect: false },
          { id: "c2", icon: "🦁", label: "Lion (Carnivore)", isCorrect: true },
          { id: "c3", icon: "🐮", label: "Cow (Herbivore)", isCorrect: false },
          { id: "c4", icon: "🐘", label: "Elephant (Herbivore)", isCorrect: false }
        ],
        hint: "Rabbits, cows, and elephants eat plants and grass. Lions hunt meat!",
        review: "Rabbits, cows, and elephants are herbivores. Lions are carnivores that hunt meat!"
      },
      {
        stageNum: 12,
        title: "Mirror Image Symmetry",
        subtitle: "Stage 12 of 15 • Expert",
        prompt: "Which shape is a PERFECT MIRROR SYMMETRY of 👈?",
        type: "cards-grid",
        layout: "2x2",
        cards: [
          { id: "c1", icon: "👈", label: "Point Left", isCorrect: false },
          { id: "c2", icon: "👉", label: "Point Right", isCorrect: true },
          { id: "c3", icon: "👆", label: "Point Up", isCorrect: false },
          { id: "c4", icon: "👇", label: "Point Down", isCorrect: false }
        ],
        hint: "A mirror reflection flips horizontal directions: Left flips to Right!",
        review: "The mirror reflection of pointing left (👈) is pointing right (👉)!"
      },
      {
        stageNum: 13,
        title: "3D Cube Net Assembly",
        subtitle: "Stage 13 of 15 • Expert",
        prompt: "A 2D cross made of 6 equal squares folds into which 3D shape?",
        type: "cards-grid",
        layout: "2x2",
        cards: [
          { id: "c1", icon: "🎲", label: "Cube", isCorrect: true },
          { id: "c2", icon: "🔺", label: "Pyramid", isCorrect: false },
          { id: "c3", icon: "⚽", label: "Sphere", isCorrect: false },
          { id: "c4", icon: "🧪", label: "Cylinder", isCorrect: false }
        ],
        hint: "A 2D net with 6 square faces folds together into a 3D box!",
        review: "A net of 6 square faces folds into a 3D Cube (🎲)!"
      },
      {
        stageNum: 14,
        title: "Top-View Shadow Projection",
        subtitle: "Stage 14 of 15 • Expert",
        prompt: "Looking from directly ABOVE a cylinder 🧪, what shape shadow is seen?",
        type: "cards-grid",
        layout: "2x2",
        cards: [
          { id: "c1", icon: "⚪", label: "Circle", isCorrect: true },
          { id: "c2", icon: "⬛", label: "Square", isCorrect: false },
          { id: "c3", icon: "🔺", label: "Triangle", isCorrect: false },
          { id: "c4", icon: "⭐", label: "Star", isCorrect: false }
        ],
        hint: "Looking down from top of a tube/cylinder shows a circular top rim!",
        review: "The top view of a cylinder is a perfect Circle (⚪)!"
      },
      {
        stageNum: 15,
        title: "Master Logical Syllogism",
        subtitle: "Stage 15 of 15 • Expert Master",
        prompt: "Rule 1: All Birds have feathers. Rule 2: Owls are Birds. Conclusion?",
        type: "cards-grid",
        layout: "2x2",
        cards: [
          { id: "c1", icon: "🦉🪶", label: "Owls have feathers", isCorrect: true },
          { id: "c2", icon: "🐘🪶", label: "Elephants have feathers", isCorrect: false },
          { id: "c3", icon: "🦉🌊", label: "Owls live under water", isCorrect: false },
          { id: "c4", icon: "🐱🪶", label: "Cats have feathers", isCorrect: false }
        ],
        hint: "If all Birds have feathers, and an Owl is a Bird, then Owls must have feathers!",
        review: "By deductive reasoning (syllogism): Owls are Birds ➔ All Birds have feathers ➔ Owls have feathers!"
      }
    ]
  },
  {
    id: "math-balance-scales",
    name: "Balance Scale Physics",
    category: "balance-scale",
    icon: "⚖️",
    description: "Drag & drop weights onto scale pans to balance physics equations.",
    engineType: "balance-scale",
    stages: [
      {
        stageNum: 1,
        title: "Single Pan Equalizer",
        subtitle: "Stage 1 of 15 • Basic",
        prompt: "Drag the correct weight onto the Right Pan to balance the scale at 6 kg!",
        type: "balance-scale",
        leftWeights: [6],
        rightWeights: [2],
        availableWeights: [1, 2, 4, 5],
        requiredRightTotal: 6,
        correctWeightToDrop: 4,
        hint: "Left side has 6 kg. Right side already has 2 kg. Drag a 4 kg weight onto the right pan (2 + 4 = 6 kg)!",
        review: "6 kg on the left equals 2 kg + 4 kg on the right. Both pans balance perfectly at 6 kg!"
      },
      {
        stageNum: 2,
        title: "Multi-Weight Addition",
        subtitle: "Stage 2 of 15 • Basic",
        prompt: "Left pan has 10 kg. Right pan has 3 kg. Drag weights to balance!",
        type: "balance-scale",
        leftWeights: [10],
        rightWeights: [3],
        availableWeights: [2, 5, 7, 8],
        requiredRightTotal: 10,
        correctWeightToDrop: 7,
        hint: "10 - 3 = 7 kg needed on the right pan!",
        review: "10 kg on the left equals 3 kg + 7 kg on the right pan!"
      },
      {
        stageNum: 3,
        title: "Heavy Load Balancing",
        subtitle: "Stage 3 of 15 • Basic",
        prompt: "Left pan has 5 kg + 5 kg (10 kg total). Right pan has 4 kg. Which weight balances the scale?",
        type: "balance-scale",
        leftWeights: [5, 5],
        rightWeights: [4],
        availableWeights: [3, 4, 6, 8],
        requiredRightTotal: 10,
        correctWeightToDrop: 6,
        hint: "Left side total = 5 + 5 = 10 kg. Right side needs 10 - 4 = 6 kg!",
        review: "10 kg total on left balances 4 kg + 6 kg = 10 kg total on right!"
      },
      {
        stageNum: 4,
        title: "Dual Weight Combination",
        subtitle: "Stage 4 of 15 • Basic",
        prompt: "Left pan has 15 kg. Right pan has 5 kg. Drag a weight to achieve equilibrium!",
        type: "balance-scale",
        leftWeights: [15],
        rightWeights: [5],
        availableWeights: [5, 8, 10, 12],
        requiredRightTotal: 15,
        correctWeightToDrop: 10,
        hint: "Subtract: 15 - 5 = 10 kg. Drag the 10 kg weight onto the right pan!",
        review: "15 kg on left balances 5 kg + 10 kg on right!"
      },
      {
        stageNum: 5,
        title: "Triple Weight Physics Master",
        subtitle: "Stage 5 of 15 • Basic",
        prompt: "Left pan has 4 kg + 8 kg + 2 kg (14 kg total). Right pan has 5 kg. What weight balances it?",
        type: "balance-scale",
        leftWeights: [4, 8, 2],
        rightWeights: [5],
        availableWeights: [6, 7, 9, 11],
        requiredRightTotal: 14,
        correctWeightToDrop: 9,
        hint: "Left side sum: 4 + 8 + 2 = 14 kg. Right side needs 14 - 5 = 9 kg!",
        review: "14 kg total on left equals 5 kg + 9 kg = 14 kg total on right pan!"
      },
      {
        stageNum: 6,
        title: "Heavy Load Matching",
        subtitle: "Stage 6 of 15 • Advanced",
        prompt: "Left pan has 20 kg. Right pan has 8 kg. Balance the scale!",
        type: "balance-scale",
        leftWeights: [20],
        rightWeights: [8],
        availableWeights: [6, 10, 12, 14],
        requiredRightTotal: 20,
        correctWeightToDrop: 12,
        hint: "20 - 8 = 12 kg needed on the right pan!",
        review: "20 kg on left equals 8 kg + 12 kg on right pan!"
      },
      {
        stageNum: 7,
        title: "Dual Pan Equalizer",
        subtitle: "Stage 7 of 15 • Advanced",
        prompt: "Left pan has 12 kg + 6 kg (18 kg). Right pan has 10 kg. Drag weight to balance!",
        type: "balance-scale",
        leftWeights: [12, 6],
        rightWeights: [10],
        availableWeights: [4, 6, 8, 10],
        requiredRightTotal: 18,
        correctWeightToDrop: 8,
        hint: "Left sum = 18 kg. Right needs 18 - 10 = 8 kg!",
        review: "18 kg total on left equals 10 kg + 8 kg on right pan!"
      },
      {
        stageNum: 8,
        title: "Subtract Weight Equation",
        subtitle: "Stage 8 of 15 • Advanced",
        prompt: "Left pan has 25 kg. Right pan has 15 kg. Which weight balances it?",
        type: "balance-scale",
        leftWeights: [25],
        rightWeights: [15],
        availableWeights: [5, 8, 10, 12],
        requiredRightTotal: 25,
        correctWeightToDrop: 10,
        hint: "25 - 15 = 10 kg needed on the right pan!",
        review: "25 kg on left balances 15 kg + 10 kg on right!"
      },
      {
        stageNum: 9,
        title: "Quad Weight Equalizer",
        subtitle: "Stage 9 of 15 • Advanced",
        prompt: "Left pan has 30 kg total. Right pan has 12 kg. Drag weight to balance!",
        type: "balance-scale",
        leftWeights: [10, 10, 10],
        rightWeights: [12],
        availableWeights: [10, 14, 18, 20],
        requiredRightTotal: 30,
        correctWeightToDrop: 18,
        hint: "30 - 12 = 18 kg needed on the right pan!",
        review: "30 kg total on left balances 12 kg + 18 kg on right!"
      },
      {
        stageNum: 10,
        title: "Mixed Weights Equalizer",
        subtitle: "Stage 10 of 15 • Advanced",
        prompt: "Left pan has 8 kg + 8 kg (16 kg). Right pan has 6 kg. Find the missing weight!",
        type: "balance-scale",
        leftWeights: [8, 8],
        rightWeights: [6],
        availableWeights: [8, 10, 12, 14],
        requiredRightTotal: 16,
        correctWeightToDrop: 10,
        hint: "16 - 6 = 10 kg needed on the right pan!",
        review: "16 kg total on left equals 6 kg + 10 kg on right pan!"
      },
      {
        stageNum: 11,
        title: "Fruit Weight Algebra",
        subtitle: "Stage 11 of 15 • Expert",
        prompt: "Left pan has 1 Watermelon 🍉 (10 kg) + 2 kg. Right pan has 4 kg. What weight balances it?",
        type: "balance-scale",
        leftWeights: [10, 2],
        rightWeights: [4],
        availableWeights: [6, 8, 10, 12],
        requiredRightTotal: 12,
        correctWeightToDrop: 8,
        hint: "Left total = 10 + 2 = 12 kg. Right pan needs 12 - 4 = 8 kg!",
        review: "12 kg total on left equals 4 kg + 8 kg on right pan!"
      },
      {
        stageNum: 12,
        title: "Object Substitution Sizing",
        subtitle: "Stage 12 of 15 • Expert",
        prompt: "Left pan has 18 kg. Right pan has 6 kg. Drag weight to achieve equilibrium!",
        type: "balance-scale",
        leftWeights: [18],
        rightWeights: [6],
        availableWeights: [8, 10, 12, 14],
        requiredRightTotal: 18,
        correctWeightToDrop: 12,
        hint: "18 - 6 = 12 kg needed on the right pan!",
        review: "18 kg on left equals 6 kg + 12 kg on right!"
      },
      {
        stageNum: 13,
        title: "Large Weight Balancing",
        subtitle: "Stage 13 of 15 • Expert",
        prompt: "Left pan has 40 kg. Right pan has 15 kg. Drag a weight to balance!",
        type: "balance-scale",
        leftWeights: [40],
        rightWeights: [15],
        availableWeights: [15, 20, 25, 30],
        requiredRightTotal: 40,
        correctWeightToDrop: 25,
        hint: "40 - 15 = 25 kg needed on the right pan!",
        review: "40 kg on left equals 15 kg + 25 kg on right pan!"
      },
      {
        stageNum: 14,
        title: "Multi-Item Pan Equalizer",
        subtitle: "Stage 14 of 15 • Expert",
        prompt: "Left pan has 7 kg + 7 kg + 7 kg (21 kg). Right pan has 9 kg. What weight balances it?",
        type: "balance-scale",
        leftWeights: [7, 7, 7],
        rightWeights: [9],
        availableWeights: [8, 10, 12, 14],
        requiredRightTotal: 21,
        correctWeightToDrop: 12,
        hint: "21 - 9 = 12 kg needed on the right pan!",
        review: "21 kg total on left equals 9 kg + 12 kg on right pan!"
      },
      {
        stageNum: 15,
        title: "Grand Master Balance System",
        subtitle: "Stage 15 of 15 • Expert Master",
        prompt: "Left pan has 50 kg total. Right pan has 20 kg. Drag the final weight to achieve equilibrium!",
        type: "balance-scale",
        leftWeights: [25, 25],
        rightWeights: [20],
        availableWeights: [20, 25, 30, 35],
        requiredRightTotal: 50,
        correctWeightToDrop: 30,
        hint: "50 - 20 = 30 kg needed on the right pan!",
        review: "50 kg total on left equals 20 kg + 30 kg on right pan!"
      }
    ]
  },
  {
    id: "math-rebus-keypad",
    name: "Rebus Math & Keypad",
    category: "rebus-keypad",
    icon: "🔢",
    description: "Solve visual picture equations (Rebus algebra) using custom touch keypads.",
    engineType: "rebus-keypad",
    stages: [
      {
        stageNum: 1,
        title: "Single Picture Substitution",
        subtitle: "Stage 1 of 15 • Basic",
        prompt: "Solve the picture equation to find the value of 🍎:",
        type: "rebus-keypad",
        equations: [
          { left: ["🍎", "+", "🍎"], right: "10" }
        ],
        targetSymbol: "🍎",
        correctAnswer: 5,
        hint: "Two identical apples equal 10. 5 + 5 = 10! So 🍎 = 5.",
        review: "🍎 + 🍎 = 10 means 5 + 5 = 10. The value of 🍎 is 5!"
      },
      {
        stageNum: 2,
        title: "Two-Variable Picture Algebra",
        subtitle: "Stage 2 of 15 • Basic",
        prompt: "If 🍎 = 5, find the value of 🍌:",
        type: "rebus-keypad",
        equations: [
          { left: ["🍎", "+", "🍎"], right: "10" },
          { left: ["🍎", "+", "🍌"], right: "8" }
        ],
        targetSymbol: "🍌",
        correctAnswer: 3,
        hint: "Since 🍎 = 5, equation 2 is 5 + 🍌 = 8. 8 - 5 = 3!",
        review: "5 + 🍌 = 8 ➔ 🍌 = 8 - 5 = 3!"
      },
      {
        stageNum: 3,
        title: "Three-Item Fruit Equation",
        subtitle: "Stage 3 of 15 • Basic",
        prompt: "Find the value of the Grapes 🍇:",
        type: "rebus-keypad",
        equations: [
          { left: ["🍎", "+", "🍎"], right: "10" },
          { left: ["🍎", "+", "🍌"], right: "8" },
          { left: ["🍌", "+", "🍇"], right: "12" }
        ],
        targetSymbol: "🍇",
        correctAnswer: 9,
        hint: "We know 🍌 = 3. So 3 + 🍇 = 12. 12 - 3 = 9!",
        review: "Since 🍌 = 3, 3 + 🍇 = 12 ➔ 🍇 = 9!"
      },
      {
        stageNum: 4,
        title: "Multiplication Rebus Equation",
        subtitle: "Stage 4 of 15 • Basic",
        prompt: "Solve for the Star ⭐ value:",
        type: "rebus-keypad",
        equations: [
          { left: ["⭐", "×", "⭐"], right: "16" },
          { left: ["⭐", "+", "🌙"], right: "11" }
        ],
        targetSymbol: "🌙",
        correctAnswer: 7,
        hint: "⭐ × ⭐ = 16 ➔ ⭐ = 4 (since 4 × 4 = 16). Then 4 + 🌙 = 11 ➔ 🌙 = 7!",
        review: "⭐ = 4. 4 + 🌙 = 11 ➔ 🌙 = 7!"
      },
      {
        stageNum: 5,
        title: "Complex Rebus System",
        subtitle: "Stage 5 of 15 • Basic",
        prompt: "What is the final answer for 🐶 + 🐱 × 🐭?",
        type: "rebus-keypad",
        equations: [
          { left: ["🐶", "+", "🐶"], right: "12" },
          { left: ["🐶", "+", "🐱"], right: "10" },
          { left: ["🐱", "+", "🐭"], right: "7" }
        ],
        targetSymbol: "🐶 + 🐱 × 🐭",
        correctAnswer: 18,
        hint: "🐶 = 6. 6 + 🐱 = 10 ➔ 🐱 = 4. 4 + 🐭 = 7 ➔ 🐭 = 3. Final: 6 + (4 × 3) = 6 + 12 = 18!",
        review: "🐶=6, 🐱=4, 🐭=3. Multiplication comes first: 4 × 3 = 12. Then 6 + 12 = 18!"
      },
      {
        stageNum: 6,
        title: "Subtract Rebus Equation",
        subtitle: "Stage 6 of 15 • Advanced",
        prompt: "Solve for the Gift 🎁 value:",
        type: "rebus-keypad",
        equations: [
          { left: ["🎈", "+", "🎈"], right: "20" },
          { left: ["🎈", "-", "🎁"], right: "4" }
        ],
        targetSymbol: "🎁",
        correctAnswer: 6,
        hint: "🎈 = 10. 10 - 🎁 = 4 ➔ 🎁 = 10 - 4 = 6!",
        review: "10 - 🎁 = 4 ➔ 🎁 = 6!"
      },
      {
        stageNum: 7,
        title: "Triple Addition Rebus",
        subtitle: "Stage 7 of 15 • Advanced",
        prompt: "Solve for the Rocket 🚀 value:",
        type: "rebus-keypad",
        equations: [
          { left: ["🚗", "+", "🚗", "+", "🚗"], right: "15" },
          { left: ["🚗", "+", "🚀"], right: "13" }
        ],
        targetSymbol: "🚀",
        correctAnswer: 8,
        hint: "3 Car 🚗 = 15 ➔ 🚗 = 5. Then 5 + 🚀 = 13 ➔ 🚀 = 8!",
        review: "🚗 = 5. 5 + 🚀 = 13 ➔ 🚀 = 8!"
      },
      {
        stageNum: 8,
        title: "Fruit Division Rebus",
        subtitle: "Stage 8 of 15 • Advanced",
        prompt: "Solve for Cherries 🍒:",
        type: "rebus-keypad",
        equations: [
          { left: ["🍍", "×", "🍍"], right: "25" },
          { left: ["🍍", "÷", "🍒"], right: "1" }
        ],
        targetSymbol: "🍒",
        correctAnswer: 5,
        hint: "🍍 = 5 (since 5 × 5 = 25). 5 ÷ 🍒 = 1 ➔ 🍒 = 5!",
        review: "🍍 = 5. 5 ÷ 5 = 1 ➔ 🍒 = 5!"
      },
      {
        stageNum: 9,
        title: "Double Variable Sizing",
        subtitle: "Stage 9 of 15 • Advanced",
        prompt: "Solve for Basketball 🏀 value:",
        type: "rebus-keypad",
        equations: [
          { left: ["🏀", "+", "⚽"], right: "14" },
          { left: ["🏀", "-", "⚽"], right: "2" }
        ],
        targetSymbol: "🏀",
        correctAnswer: 8,
        hint: "Add equations: 2×🏀 = 16 ➔ 🏀 = 8!",
        review: "If 🏀 = 8 and ⚽ = 6, then 8 + 6 = 14 and 8 - 6 = 2!"
      },
      {
        stageNum: 10,
        title: "Multi-Operator System",
        subtitle: "Stage 10 of 15 • Advanced",
        prompt: "Solve for Crown 👑 value:",
        type: "rebus-keypad",
        equations: [
          { left: ["💎", "+", "💎"], right: "16" },
          { left: ["💎", "×", "👑"], right: "32" }
        ],
        targetSymbol: "👑",
        correctAnswer: 4,
        hint: "💎 = 8. 8 × 👑 = 32 ➔ 👑 = 32 ÷ 8 = 4!",
        review: "💎 = 8. 8 × 👑 = 32 ➔ 👑 = 4!"
      },
      {
        stageNum: 11,
        title: "Animal Multiplication",
        subtitle: "Stage 11 of 15 • Expert",
        prompt: "Solve for Bear 🐻 value:",
        type: "rebus-keypad",
        equations: [
          { left: ["🦊", "×", "🦊"], right: "36" },
          { left: ["🦊", "+", "🐻"], right: "15" }
        ],
        targetSymbol: "🐻",
        correctAnswer: 9,
        hint: "🦊 = 6 (since 6 × 6 = 36). 6 + 🐻 = 15 ➔ 🐻 = 9!",
        review: "🦊 = 6. 6 + 🐻 = 15 ➔ 🐻 = 9!"
      },
      {
        stageNum: 12,
        title: "Shape Algebra System",
        subtitle: "Stage 12 of 15 • Expert",
        prompt: "Solve for Green Square 🟩 value:",
        type: "rebus-keypad",
        equations: [
          { left: ["🔺", "+", "🔺", "+", "🔺"], right: "18" },
          { left: ["🔺", "×", "🟩"], right: "24" }
        ],
        targetSymbol: "🟩",
        correctAnswer: 4,
        hint: "3 Triangle = 18 ➔ 🔺 = 6. 6 × 🟩 = 24 ➔ 🟩 = 4!",
        review: "🔺 = 6. 6 × 🟩 = 24 ➔ 🟩 = 4!"
      },
      {
        stageNum: 13,
        title: "3-Variable Complex System",
        subtitle: "Stage 13 of 15 • Expert",
        prompt: "Solve for Lightning ⚡ value:",
        type: "rebus-keypad",
        equations: [
          { left: ["🌞"], right: "10" },
          { left: ["🌞", "+", "🌈"], right: "17" },
          { left: ["🌈", "×", "⚡"], right: "28" }
        ],
        targetSymbol: "⚡",
        correctAnswer: 4,
        hint: "🌞 = 10. 10 + 🌈 = 17 ➔ 🌈 = 7. 7 × ⚡ = 28 ➔ ⚡ = 4!",
        review: "🌞 = 10, 🌈 = 7. 7 × ⚡ = 28 ➔ ⚡ = 4!"
      },
      {
        stageNum: 14,
        title: "Dual Operator Order of Operations",
        subtitle: "Stage 14 of 15 • Expert",
        prompt: "Find answer for 🍔 + 🍟 × 🍕:",
        type: "rebus-keypad",
        equations: [
          { left: ["🍔"], right: "6" },
          { left: ["🍟"], right: "4" },
          { left: ["🍕"], right: "5" }
        ],
        targetSymbol: "🍔 + 🍟 × 🍕",
        correctAnswer: 26,
        hint: "Multiplication first: 🍟 × 🍕 = 4 × 5 = 20. Then 🍔 + 20 = 6 + 20 = 26!",
        review: "Order of operations: 4 × 5 = 20. Then 6 + 20 = 26!"
      },
      {
        stageNum: 15,
        title: "Grand Master Rebus System",
        subtitle: "Stage 15 of 15 • Expert Master",
        prompt: "Solve final equation for 🚀 × 🛸 + 👾:",
        type: "rebus-keypad",
        equations: [
          { left: ["🚀"], right: "8" },
          { left: ["🛸"], right: "3" },
          { left: ["👾"], right: "7" }
        ],
        targetSymbol: "🚀 × 🛸 + 👾",
        correctAnswer: 31,
        hint: "Multiplication first: 🚀 × 🛸 = 8 × 3 = 24. Then 24 + 👾 = 24 + 7 = 31!",
        review: "8 × 3 = 24. 24 + 7 = 31!"
      }
    ]
  },
  {
    id: "spatial-3d-cubes",
    name: "3D Isometric Cube Counter",
    category: "spatial-3d",
    icon: "📦",
    description: "Inspect multi-layer 3D isometric cube towers, rotate camera views, and count blocks.",
    engineType: "spatial-3d",
    stages: [
      {
        stageNum: 1,
        title: "Simple 2D/3D Cube Stack",
        subtitle: "Stage 1 of 15 • Basic",
        prompt: "Count the total number of isometric cubes in this stack:",
        type: "spatial-3d",
        gridWidth: 3,
        gridLength: 1,
        heightMap: [
          [1, 1, 1]
        ],
        totalCubes: 3,
        hint: "Count the blocks side by side: 1, 2, 3!",
        review: "There are 3 blocks placed side-by-side in a single row."
      },
      {
        stageNum: 2,
        title: "Hidden Supporting Base Cubes",
        subtitle: "Stage 2 of 15 • Basic",
        prompt: "There is 1 cube on top resting on a 2x2 base. How many TOTAL cubes are there?",
        type: "spatial-3d",
        gridWidth: 2,
        gridLength: 2,
        heightMap: [
          [2, 1],
          [1, 1]
        ],
        totalCubes: 5,
        hint: "Remember: The top cube cannot float! It needs 4 base cubes beneath it (4 base + 1 top = 5).",
        review: "4 cubes make up the bottom base layer + 1 top cube = 5 total cubes!"
      },
      {
        stageNum: 3,
        title: "3D L-Shaped Tower",
        subtitle: "Stage 3 of 15 • Basic",
        prompt: "Count the cubes in this L-shaped 3D structure. Rotate the view if needed!",
        type: "spatial-3d",
        gridWidth: 3,
        gridLength: 3,
        heightMap: [
          [3, 0, 0],
          [1, 0, 0],
          [1, 1, 1]
        ],
        totalCubes: 6,
        hint: "Tower corner has 3 cubes. Floor extensions add 3 extra cubes. 3 + 3 = 6!",
        review: "3 cubes in the vertical corner tower + 3 cubes along the floor arms = 6 total cubes!"
      },
      {
        stageNum: 4,
        title: "Multi-Tier Pyramid Block",
        subtitle: "Stage 4 of 15 • Basic",
        prompt: "How many total cubes are in this multi-tiered isometric structure?",
        type: "spatial-3d",
        gridWidth: 3,
        gridLength: 3,
        heightMap: [
          [1, 2, 1],
          [2, 3, 2],
          [1, 2, 1]
        ],
        totalCubes: 15,
        hint: "Layer 1 (bottom): 9 cubes. Layer 2: 5 cubes. Layer 3 (top peak): 1 cube. 9 + 5 + 1 = 15!",
        review: "9 base cubes + 5 middle cubes + 1 top peak cube = 15 total cubes!"
      },
      {
        stageNum: 5,
        title: "3D Isometric Castle Complex",
        subtitle: "Stage 5 of 15 • Basic",
        prompt: "Inspect this complex 3D block castle. Rotate the camera to count all hidden cubes!",
        type: "spatial-3d",
        gridWidth: 3,
        gridLength: 3,
        heightMap: [
          [2, 1, 2],
          [1, 3, 1],
          [2, 1, 2]
        ],
        totalCubes: 15,
        hint: "4 corner towers of height 2 (8 cubes) + 4 walls of height 1 (4 cubes) + 1 center spire of height 3 (3 cubes) = 8 + 4 + 3 = 15!",
        review: "8 tower cubes + 4 wall cubes + 3 central spire cubes = 15 total cubes!"
      },
      {
        stageNum: 6,
        title: "2x3 Dual Tower Stack",
        subtitle: "Stage 6 of 15 • Advanced",
        prompt: "Count the total cubes in this 2-row tower layout:",
        type: "spatial-3d",
        gridWidth: 3,
        gridLength: 2,
        heightMap: [
          [2, 2, 2],
          [1, 1, 1]
        ],
        totalCubes: 9,
        hint: "Front row has 3 cubes of height 1 (3 cubes). Back row has 3 cubes of height 2 (6 cubes). 3 + 6 = 9!",
        review: "3 front cubes + 6 back tower cubes = 9 total cubes!"
      },
      {
        stageNum: 7,
        title: "Staircase Step Block",
        subtitle: "Stage 7 of 15 • Advanced",
        prompt: "Count the cubes in this stepping staircase structure:",
        type: "spatial-3d",
        gridWidth: 3,
        gridLength: 2,
        heightMap: [
          [3, 2, 1],
          [3, 2, 1]
        ],
        totalCubes: 12,
        hint: "Row 1: 3+2+1 = 6 cubes. Row 2: 3+2+1 = 6 cubes. Total = 12!",
        review: "6 cubes in left row + 6 cubes in right row = 12 total cubes!"
      },
      {
        stageNum: 8,
        title: "Hollow Center Square Tower",
        subtitle: "Stage 8 of 15 • Advanced",
        prompt: "Count the cubes in this hollow-centered square tower:",
        type: "spatial-3d",
        gridWidth: 3,
        gridLength: 3,
        heightMap: [
          [2, 2, 2],
          [2, 0, 2],
          [2, 2, 2]
        ],
        totalCubes: 16,
        hint: "Outer ring has 8 columns of height 2 (8 × 2 = 16). Center is empty (0).",
        review: "8 outer columns of 2 cubes each = 16 total cubes!"
      },
      {
        stageNum: 9,
        title: "Cross-Shaped Fortress",
        subtitle: "Stage 9 of 15 • Advanced",
        prompt: "How many cubes form this cross-shaped 3D fortress?",
        type: "spatial-3d",
        gridWidth: 3,
        gridLength: 3,
        heightMap: [
          [0, 2, 0],
          [2, 4, 2],
          [0, 2, 0]
        ],
        totalCubes: 12,
        hint: "Center spire: 4 cubes. 4 arms of height 2: 4 × 2 = 8 cubes. Total = 4 + 8 = 12!",
        review: "4 central spire cubes + 8 arm cubes = 12 total cubes!"
      },
      {
        stageNum: 10,
        title: "Diagonal Staircase Pyramid",
        subtitle: "Stage 10 of 15 • Advanced",
        prompt: "Count the total cubes in this 3x3 diagonal step pyramid:",
        type: "spatial-3d",
        gridWidth: 3,
        gridLength: 3,
        heightMap: [
          [4, 3, 2],
          [3, 2, 1],
          [2, 1, 1]
        ],
        totalCubes: 19,
        hint: "Sum all column heights: 4+3+2 + 3+2+1 + 2+1+1 = 19 cubes!",
        review: "Summing all height columns: 9 + 6 + 4 = 19 total cubes!"
      },
      {
        stageNum: 11,
        title: "Twin Corner Spire Structure",
        subtitle: "Stage 11 of 15 • Expert",
        prompt: "Count the cubes in this twin corner spire structure:",
        type: "spatial-3d",
        gridWidth: 3,
        gridLength: 3,
        heightMap: [
          [3, 1, 3],
          [1, 1, 1],
          [3, 1, 3]
        ],
        totalCubes: 17,
        hint: "4 corner towers of height 3 = 12 cubes. 5 connecting floor cubes of height 1 = 5 cubes. 12 + 5 = 17!",
        review: "12 tower cubes + 5 floor cubes = 17 total cubes!"
      },
      {
        stageNum: 12,
        title: "Ziggurat Temple Stack",
        subtitle: "Stage 12 of 15 • Expert",
        prompt: "How many cubes form this 4x4 Ziggurat Temple structure?",
        type: "spatial-3d",
        gridWidth: 4,
        gridLength: 4,
        heightMap: [
          [1, 1, 1, 1],
          [1, 2, 2, 1],
          [1, 2, 2, 1],
          [1, 1, 1, 1]
        ],
        totalCubes: 20,
        hint: "Base layer 4x4 = 16 cubes. Center top 2x2 = 4 cubes. 16 + 4 = 20!",
        review: "16 base cubes + 4 upper center cubes = 20 total cubes!"
      },
      {
        stageNum: 13,
        title: "Isometric U-Bridge Structure",
        subtitle: "Stage 13 of 15 • Expert",
        prompt: "Count the total cubes in this isometric U-bridge tower:",
        type: "spatial-3d",
        gridWidth: 3,
        gridLength: 3,
        heightMap: [
          [3, 1, 3],
          [3, 0, 3],
          [3, 3, 3]
        ],
        totalCubes: 21,
        hint: "6 columns of height 3 = 18 cubes. 3 bridge/wall cubes of height 1 = 3 cubes. 18 + 3 = 21!",
        review: "18 tower column cubes + 3 connecting cubes = 21 total cubes!"
      },
      {
        stageNum: 14,
        title: "Spiral Tower Complex",
        subtitle: "Stage 14 of 15 • Expert",
        prompt: "Inspect and count all cubes in this spiral 3D tower complex:",
        type: "spatial-3d",
        gridWidth: 3,
        gridLength: 3,
        heightMap: [
          [1, 2, 3],
          [4, 5, 4],
          [3, 2, 1]
        ],
        totalCubes: 25,
        hint: "Center peak = 5 cubes. Surrounding spiraling heights: 1+2+3+4+4+3+2+1 = 20 cubes. Total = 25!",
        review: "5 central peak cubes + 20 spiraling wall cubes = 25 total cubes!"
      },
      {
        stageNum: 15,
        title: "Grand Master Isometric Megastructure",
        subtitle: "Stage 15 of 15 • Expert Master",
        prompt: "Inspect this 5x5 Grand Master Megastructure and count all cubes!",
        type: "spatial-3d",
        gridWidth: 5,
        gridLength: 5,
        heightMap: [
          [3, 2, 1, 2, 3],
          [2, 3, 4, 3, 2],
          [1, 4, 5, 4, 1],
          [2, 3, 4, 3, 2],
          [3, 2, 1, 2, 3]
        ],
        totalCubes: 66,
        hint: "Central peak = 5. Layer 2 = 16 (4×4). Layer 3 = 12 (3×4). Outer corners = 12 + 12 + 9 = 66 cubes!",
        review: "Sum of all 25 heightmap columns = 66 total cubes!"
      }
    ]
  },
  {
    id: "sudoku-matrix-grid",
    name: "Sudoku & Matrix Engine",
    category: "sudoku-matrix",
    icon: "🧩",
    description: "Fill interactive 3x3 and 4x4 matrix grids verifying row, column, and block constraints.",
    engineType: "sudoku-matrix",
    stages: [
      {
        stageNum: 1,
        title: "3x3 Fruit Matrix Sudoku",
        subtitle: "Stage 1 of 15 • Basic",
        prompt: "Each row and column must contain 🍎, 🍌, 🍇 without duplicates. Fill the missing cell (❓):",
        type: "sudoku-matrix",
        gridSize: 3,
        symbols: ["🍎", "🍌", "🍇"],
        initialGrid: [
          ["🍎", "🍌", "🍇"],
          ["🍇", "🍎", "🍌"],
          ["🍌", "🍇", null]
        ],
        solution: [
          ["🍎", "🍌", "🍇"],
          ["🍇", "🍎", "🍌"],
          ["🍌", "🍇", "🍎"]
        ],
        hint: "Row 3 has 🍌 and 🍇. The missing fruit is 🍎!",
        review: "Row 3 and Column 3 both needed 🍎 to complete the 3x3 matrix without duplicates!"
      },
      {
        stageNum: 2,
        title: "3x3 Dual Missing Cell Matrix",
        subtitle: "Stage 2 of 15 • Basic",
        prompt: "Fill the two empty cells in this 3x3 shape grid (🔴, 🟦, ⭐️):",
        type: "sudoku-matrix",
        gridSize: 3,
        symbols: ["🔴", "🟦", "⭐️"],
        initialGrid: [
          ["🔴", "🟦", null],
          ["⭐️", null, "🟦"],
          ["🟦", "⭐️", "🔴"]
        ],
        solution: [
          ["🔴", "🟦", "⭐️"],
          ["⭐️", "🔴", "🟦"],
          ["🟦", "⭐️", "🔴"]
        ],
        hint: "Row 1 missing: ⭐️. Row 2 missing: 🔴.",
        review: "Filling ⭐️ in cell (0,2) and 🔴 in cell (1,1) satisfies all row and column constraints!"
      },
      {
        stageNum: 3,
        title: "3x3 Color Palette Grid",
        subtitle: "Stage 3 of 15 • Basic",
        prompt: "Fill 3 empty cells so every row and column has unique colors (🟡, 🟢, 🟣):",
        type: "sudoku-matrix",
        gridSize: 3,
        symbols: ["🟡", "🟢", "🟣"],
        initialGrid: [
          ["🟡", null, "🟢"],
          [null, "🟡", "🟣"],
          ["🟣", "🟢", null]
        ],
        solution: [
          ["🟡", "🟣", "🟢"],
          ["🟢", "🟡", "🟣"],
          ["🟣", "🟢", "🟡"]
        ],
        hint: "Row 1 missing 🟣. Row 2 missing 🟢. Row 3 missing 🟡!",
        review: "Cell (0,1)=🟣, Cell (1,0)=🟢, Cell (2,2)=🟡 satisfies unique color constraints."
      },
      {
        stageNum: 4,
        title: "3x3 Transport Matrix",
        subtitle: "Stage 4 of 15 • Basic",
        prompt: "Fill the 4 missing vehicle cells (🚗, 🚀, ⛵):",
        type: "sudoku-matrix",
        gridSize: 3,
        symbols: ["🚗", "🚀", "⛵"],
        initialGrid: [
          ["🚗", "🚀", null],
          [null, "🚗", null],
          ["🚀", null, "🚗"]
        ],
        solution: [
          ["🚗", "🚀", "⛵"],
          ["⛵", "🚗", "🚀"],
          ["🚀", "⛵", "🚗"]
        ],
        hint: "Check Row 1: missing ⛵. Row 2: ⛵ then 🚀. Row 3: missing ⛵.",
        review: "Row 1 needs ⛵, Row 2 needs ⛵ and 🚀, Row 3 needs ⛵."
      },
      {
        stageNum: 5,
        title: "3x3 Pet Friend Matrix",
        subtitle: "Stage 5 of 15 • Basic",
        prompt: "Fill the empty pet cells (🐶, 🐱, 🐰):",
        type: "sudoku-matrix",
        gridSize: 3,
        symbols: ["🐶", "🐱", "🐰"],
        initialGrid: [
          ["🐶", null, "🐱"],
          [null, "🐶", null],
          ["🐰", null, "🐶"]
        ],
        solution: [
          ["🐶", "🐰", "🐱"],
          ["🐱", "🐶", "🐰"],
          ["🐰", "🐱", "🐶"]
        ],
        hint: "Row 1 missing 🐰. Row 2 has 🐶 in center, needs 🐱 on left and 🐰 on right.",
        review: "Cell (0,1)=🐰, Cell (1,0)=🐱, Cell (1,2)=🐰, Cell (2,1)=🐱 completes the matrix!"
      },
      {
        stageNum: 6,
        title: "4x4 Mini Number Sudoku",
        subtitle: "Stage 6 of 15 • Advanced",
        prompt: "Complete this 4x4 Sudoku grid! Each row, column, and 2x2 box must contain numbers 1, 2, 3, 4.",
        type: "sudoku-matrix",
        gridSize: 4,
        symbols: ["1", "2", "3", "4"],
        initialGrid: [
          ["1", "2", "3", "4"],
          ["3", "4", "1", "2"],
          ["2", "1", "4", null],
          ["4", "3", null, "1"]
        ],
        solution: [
          ["1", "2", "3", "4"],
          ["3", "4", "1", "2"],
          ["2", "1", "4", "3"],
          ["4", "3", "2", "1"]
        ],
        hint: "Row 3 is missing 3. Row 4 is missing 2!",
        review: "Row 3 needs 3 and Row 4 needs 2. All rows, columns, and 2x2 sub-boxes now have numbers 1 to 4!"
      },
      {
        stageNum: 7,
        title: "4x4 Magic Symbol Matrix",
        subtitle: "Stage 7 of 15 • Advanced",
        prompt: "Fill 3 empty cells with 🌟, 💎, 🍀, ⚡ in this 4x4 Sudoku grid:",
        type: "sudoku-matrix",
        gridSize: 4,
        symbols: ["🌟", "💎", "🍀", "⚡"],
        initialGrid: [
          ["🌟", "💎", "🍀", "⚡"],
          ["🍀", null, "🌟", "💎"],
          ["💎", "🌟", null, "🍀"],
          ["⚡", "🍀", "💎", null]
        ],
        solution: [
          ["🌟", "💎", "🍀", "⚡"],
          ["🍀", "⚡", "🌟", "💎"],
          ["💎", "🌟", "⚡", "🍀"],
          ["⚡", "🍀", "💎", "🌟"]
        ],
        hint: "Row 2 missing ⚡. Row 3 missing ⚡. Row 4 missing 🌟!",
        review: "Cell (1,1)=⚡, Cell (2,2)=⚡, Cell (3,3)=🌟 completes all 4x4 box and line constraints!"
      },
      {
        stageNum: 8,
        title: "4x4 Elemental Force Sudoku",
        subtitle: "Stage 8 of 15 • Advanced",
        prompt: "Fill the 4 empty elemental cells (🔥, 💧, 🍃, ⚡):",
        type: "sudoku-matrix",
        gridSize: 4,
        symbols: ["🔥", "💧", "🍃", "⚡"],
        initialGrid: [
          ["🔥", null, "🍃", "⚡"],
          ["🍃", "⚡", null, "💧"],
          ["💧", "🔥", "⚡", null],
          [null, "🍃", "💧", "🔥"]
        ],
        solution: [
          ["🔥", "💧", "🍃", "⚡"],
          ["🍃", "⚡", "🔥", "💧"],
          ["💧", "🔥", "⚡", "🍃"],
          ["⚡", "🍃", "💧", "🔥"]
        ],
        hint: "Row 1 missing 💧. Row 2 missing 🔥. Row 3 missing 🍃. Row 4 missing ⚡.",
        review: "Filling 💧, 🔥, 🍃, ⚡ in respective empty cells completes the elemental grid!"
      },
      {
        stageNum: 9,
        title: "4x4 Cosmic Space Sudoku",
        subtitle: "Stage 9 of 15 • Advanced",
        prompt: "Fill 5 cosmic space cells (🚀, 🛸, 🌙, 🪐):",
        type: "sudoku-matrix",
        gridSize: 4,
        symbols: ["🚀", "🛸", "🌙", "🪐"],
        initialGrid: [
          ["🚀", null, "🌙", "🪐"],
          [null, "🪐", "🚀", null],
          ["🛸", "🚀", null, "🌙"],
          ["🪐", null, "🛸", "🚀"]
        ],
        solution: [
          ["🚀", "🛸", "🌙", "🪐"],
          ["🌙", "🪐", "🚀", "🛸"],
          ["🛸", "🚀", "🪐", "🌙"],
          ["🪐", "🌙", "🛸", "🚀"]
        ],
        hint: "Row 1 missing 🛸. Row 2 missing 🌙 and 🛸. Row 3 missing 🪐. Row 4 missing 🌙.",
        review: "Cell (0,1)=🛸, Cell (1,0)=🌙, Cell (1,3)=🛸, Cell (2,2)=🪐, Cell (3,1)=🌙!"
      },
      {
        stageNum: 10,
        title: "4x4 Gourmet Food Matrix",
        subtitle: "Stage 10 of 15 • Advanced",
        prompt: "Fill 5 empty food items (🍔, 🍕, 🍟, 🌮):",
        type: "sudoku-matrix",
        gridSize: 4,
        symbols: ["🍔", "🍕", "🍟", "🌮"],
        initialGrid: [
          ["🍔", "🍕", null, "🌮"],
          [null, "🌮", "🍔", null],
          ["🍕", null, "🌮", "🍟"],
          ["🌮", "🍟", null, "🍔"]
        ],
        solution: [
          ["🍔", "🍕", "🍟", "🌮"],
          ["🍟", "🌮", "🍔", "🍕"],
          ["🍕", "🍔", "🌮", "🍟"],
          ["🌮", "🍟", "🍕", "🍔"]
        ],
        hint: "Row 1 missing 🍟. Row 2 missing 🍟 and 🍕. Row 3 missing 🍔. Row 4 missing 🍕.",
        review: "Cell (0,2)=🍟, Cell (1,0)=🍟, Cell (1,3)=🍕, Cell (2,1)=🍔, Cell (3,2)=🍕!"
      },
      {
        stageNum: 11,
        title: "4x4 Sports Arena Sudoku",
        subtitle: "Stage 11 of 15 • Expert",
        prompt: "Fill 6 empty sports balls (⚽, 🏀, 🎾, 🏐):",
        type: "sudoku-matrix",
        gridSize: 4,
        symbols: ["⚽", "🏀", "🎾", "🏐"],
        initialGrid: [
          ["⚽", null, "🎾", null],
          [null, "🏐", "⚽", "🏀"],
          ["🏀", "⚽", null, "🎾"],
          ["🏐", null, "🏀", "⚽"]
        ],
        solution: [
          ["⚽", "🏀", "🎾", "🏐"],
          ["🎾", "🏐", "⚽", "🏀"],
          ["🏀", "⚽", "🏐", "🎾"],
          ["🏐", "🎾", "🏀", "⚽"]
        ],
        hint: "Row 1 missing 🏀 and 🏐. Row 2 missing 🎾. Row 3 missing 🏐. Row 4 missing 🎾.",
        review: "Completing empty cells satisfies all 2x2 subgrid and row/col constraints!"
      },
      {
        stageNum: 12,
        title: "4x4 High-Digit Math Grid",
        subtitle: "Stage 12 of 15 • Expert",
        prompt: "Fill 6 missing digit cells (5, 6, 7, 8):",
        type: "sudoku-matrix",
        gridSize: 4,
        symbols: ["5", "6", "7", "8"],
        initialGrid: [
          ["5", null, "7", "8"],
          [null, "8", null, "6"],
          ["6", "5", "8", null],
          ["8", null, "6", null]
        ],
        solution: [
          ["5", "6", "7", "8"],
          ["7", "8", "5", "6"],
          ["6", "5", "8", "7"],
          ["8", "7", "6", "5"]
        ],
        hint: "Row 1 missing 6. Row 2 missing 7 and 5. Row 3 missing 7. Row 4 missing 7 and 5.",
        review: "Cell (0,1)=6, Cell (1,0)=7, Cell (1,2)=5, Cell (2,3)=7, Cell (3,1)=7, Cell (3,3)=5!"
      },
      {
        stageNum: 13,
        title: "4x4 Geometric Crystal Matrix",
        subtitle: "Stage 13 of 15 • Expert",
        prompt: "Fill 7 empty geometric crystal shapes (🔺, 🟦, 🟡, 🔷):",
        type: "sudoku-matrix",
        gridSize: 4,
        symbols: ["🔺", "🟦", "🟡", "🔷"],
        initialGrid: [
          ["🔺", null, null, "🔷"],
          ["🟡", "🔷", "🔺", null],
          [null, "🔺", "🔷", "🟡"],
          ["🔷", null, "🟦", "🔺"]
        ],
        solution: [
          ["🔺", "🟦", "🟡", "🔷"],
          ["🟡", "🔷", "🔺", "🟦"],
          ["🟦", "🔺", "🔷", "🟡"],
          ["🔷", "🟡", "🟦", "🔺"]
        ],
        hint: "Row 1 missing 🟦 and 🟡. Row 2 missing 🟦. Row 3 missing 🟦. Row 4 missing 🟡.",
        review: "All 7 empty cells deduce uniquely based on row/column intersections."
      },
      {
        stageNum: 14,
        title: "4x4 Wild Animal Kingdom",
        subtitle: "Stage 14 of 15 • Expert",
        prompt: "Fill 8 empty wild animal cells (🦁, 🐘, 🦒, 🐵):",
        type: "sudoku-matrix",
        gridSize: 4,
        symbols: ["🦁", "🐘", "🦒", "🐵"],
        initialGrid: [
          ["🦁", null, "🦒", null],
          [null, "🐵", null, "🐘"],
          ["🐘", "🦁", null, "🦒"],
          [null, "🦒", "🐘", null]
        ],
        solution: [
          ["🦁", "🐘", "🦒", "🐵"],
          ["🦒", "🐵", "🦁", "🐘"],
          ["🐘", "🦁", "🐵", "🦒"],
          ["🐵", "🦒", "🐘", "🦁"]
        ],
        hint: "Row 1 missing 🐘 and 🐵. Row 2 missing 🦒 and 🦁. Row 3 missing 🐵. Row 4 missing 🐵 and 🦁.",
        review: "Deduce step-by-step: Cell (0,1)=🐘, Cell (0,3)=🐵, Cell (1,0)=🦒, Cell (1,2)=🦁, Cell (2,2)=🐵, Cell (3,0)=🐵, Cell (3,3)=🦁!"
      },
      {
        stageNum: 15,
        title: "4x4 Grand Master Royal Matrix",
        subtitle: "Stage 15 of 15 • Expert Master",
        prompt: "Solve this 8-cell empty Royal Master Sudoku grid (👑, 💎, 🏆, 🌟):",
        type: "sudoku-matrix",
        gridSize: 4,
        symbols: ["👑", "💎", "🏆", "🌟"],
        initialGrid: [
          ["👑", null, null, "🌟"],
          [null, "🌟", "👑", null],
          [null, "👑", "🌟", null],
          ["🌟", null, null, "👑"]
        ],
        solution: [
          ["👑", "💎", "🏆", "🌟"],
          ["🏆", "🌟", "👑", "💎"],
          ["💎", "👑", "🌟", "🏆"],
          ["🌟", "🏆", "💎", "👑"]
        ],
        hint: "Box 1 (top-left) has 👑 and 🌟 on diagonal ➔ Top-right of Box 1 must be 💎 or 🏆. Row 1 has 👑 and 🌟 ➔ fill 💎 then 🏆!",
        review: "Congratulations! You completed the Grand Master 4x4 Logic Matrix Sudoku Puzzle!"
      }
    ]
  }
];
