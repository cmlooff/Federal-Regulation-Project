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
        // Was school -> now name -> Name of petition
        type: String
        // required: true
      },
      type: {
        // Was degree -> now type -> Type of Petition -> Add new, Modify current, or Delete Request
        type: String
      },
      department: {
        // Was fieldofstudy -> now department -> Department you want to submit to
        type: String
        // required: true
      },
      regulation: {
        // Was from -> now regulation -> What's the regulation you want to target
        type: String
      },
      sources: {
        // Was to -> now sources -> Sources that you attached to the petition
        type: String
      },
      // current: {
      //   type: Boolean,
      //   default: false
      // },
      description: {
        type: String
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
