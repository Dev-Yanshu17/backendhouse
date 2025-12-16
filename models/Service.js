const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  shortDesc: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  features: {
    type: [String]
  },
  amenities: {
    type: [String], // Array of amenities
    default: []
  }
}, { timestamps: true });

// Pre-save hook to auto-increment 'id'
serviceSchema.pre("save", async function(next) {
  if (!this.isNew) return next();

  try {
    const lastDoc = await this.constructor.findOne({}, {}, { sort: { id: -1 } });
    this.id = lastDoc ? lastDoc.id + 1 : 1;
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("Service", serviceSchema);
