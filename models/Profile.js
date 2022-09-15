const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  /** Reference to User Model
   * We want to create a reference to User model -> Every profile should be associated with the user
   * We're targeting the user ID by using mongoose.Schema.Types.ObjectId
   */
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  company: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  title: {
    // This is where users will pick options of what kind of 'advocacy' they want to be. Lawyer, Advocate, Follower
    type: String
    // required: true
  },
  interests: {
    // This is going to be where users input their interested regulation fields
    type: [String]
    // required: true
  },
  bio: {
    type: String
  },
  // // Don't know if I want to include this
  // githubusername: {
  //   type: String
  // },
  /** Experience
   * This is so that users can have the ability to input their own prior experience
   */
  experience: [
    {
      title: {
        type: String
      },
      company: {
        type: String
        // required: true
      },
      location: {
        type: String
      },
      from: {
        type: Date
        // required: true
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
  petitions: [
    // Was education -> now petition -> Petition Array of objects
    {
      name: {
        type: String
        // required: true
      },
      email: {
        type: String
      },
      address: {
        type: String
        // required: true
      },
      interests: {
        type: String
      },
      actionType: {
        // Users will pick from Commence new rulemaking, Amendment of existing rule, or Deregulation
        type: String
        // required: true
      },
      actionPurpose: {
        // What's the purpose of the users' adding/changing/deregulating? Why do they want to add/change/delete?
        type: String
      },
      actionChanges: {
        // What do you want to change in the existing rule?
        type: String
      },
      actionInterest: {
        // How will this change/addition/deletion benefit the people?
        type: String
      },
      actionSupport: {
        // Technical documentation, scientific research, or more technical information
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
