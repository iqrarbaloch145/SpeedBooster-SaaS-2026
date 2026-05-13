const mongoose = require('mongoose');

const reportSchema = mongoose.Schema(
  {
    siteId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Site',
    },
    performanceScore: {
      type: Number,
      required: true,
    },
    lcp: {
      type: String, // Largest Contentful Paint
    },
    cls: {
      type: String, // Cumulative Layout Shift
    },
    tbt: {
      type: String, // Total Blocking Time
    },
    deviceType: {
      type: String,
      enum: ['desktop', 'mobile', 'tablet'],
      default: 'desktop',
    },
    issues: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Report = mongoose.model('Report', reportSchema);
module.exports = Report;
