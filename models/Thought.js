const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// Schema to create a thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      // Getter to format date timestamp
      get: createdAtVal => dateFormat(createdAtVal),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [{ type: Schema.Types.ObjectId, ref: "Reaction" }],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
  },
);

thoughtSchema.virtual("reactionCount").get(function() {
  return this.reactions.length;
});

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      // Getter to format date timestamp
      get: createdAtVal => dateFormat(createdAtVal)
    },
  },
  {
    toJSON: {
      getters: true
    }
  },
)

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
