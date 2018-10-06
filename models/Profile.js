const mongoose = require("mongoose");

// Create schema
const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  company: {
    type: String,
    max: 100
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    require: true
  },
  bio: {
    type: String,
    require: true
  },
  githubusername: {
    type: String
  },
  experience: [
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        require: true
      },
      location: {
        require: String
      },
      from: {
        type: Date,
        require: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  experience: [
    {
      school: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        require: true
      },
      fieldofstudy: {
        require: String
      },
      from: {
        type: Date,
        require: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  social: {
    youtube: {
      type: String
    },
    linkedin: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("profile", ProfileSchema);
