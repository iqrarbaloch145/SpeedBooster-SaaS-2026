const mongoose = require('mongoose');

const siteSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    url: {
      type: String,
      required: true,
    },
    apiKey: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Site = mongoose.model('Site', siteSchema);
module.exports = Site;
