const mongoose = require("mongoose");
const Counter = require("./counter");

/* Floor Plan Schema */
const FloorPlanSchema = new mongoose.Schema({
  title: String,
  size: String,
  image: String
});

const ProjectSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true },

    projectName: { type: String, required: true },
    projectType: {
      type: String,
      enum: ["flat", "banglow", "row-house"],
      required: true,
    },

    location: String,
    perHouseCost: Number,
    squareFeet: Number,

    totalWings: Number,
    totalFloors: Number,
    perFloorHouse: Number,
    totalPlots: Number,

    totalHouse: Number,
    totalHouseCost: Number,
    houseNumbers: [String],

    images: [String],
    amenities: [String],

    /* 🔥 Floor Plans */
    floorPlans: [FloorPlanSchema]
  },
  { timestamps: true }
);

/* Auto ID + Calculations */
ProjectSchema.pre("save", async function (next) {
  if (!this.id) {
    const counter = await Counter.findOneAndUpdate(
      { model: "project" },
      { $inc: { count: 1 } },
      { new: true, upsert: true }
    );
    this.id = counter.count;
  }

  if (this.projectType === "flat") {
    this.totalHouse =
      this.totalWings * this.totalFloors * this.perFloorHouse;

    const houses = [];
    for (let w = 0; w < this.totalWings; w++) {
      const wing = String.fromCharCode(65 + w);
      for (let f = 1; f <= this.totalFloors; f++) {
        for (let h = 1; h <= this.perFloorHouse; h++) {
          houses.push(`${wing}-${f}${String(h).padStart(2, "0")}`);
        }
      }
    }
    this.houseNumbers = houses;
  } else {
    this.totalHouse = this.totalPlots;
    this.houseNumbers = Array.from(
      { length: this.totalPlots },
      (_, i) => String(i + 1).padStart(2, "0")
    );
  }

  this.totalHouseCost =
    this.totalHouse * this.squareFeet * this.perHouseCost;

  next();
});

module.exports = mongoose.model("Project", ProjectSchema);
