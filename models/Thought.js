const { Schema, model } = require('mongoose');

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
      // Getter to format date timestamp TODO
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [{ type: Schema.Types.ObjectId, ref: "Reaction" }],
  }
);

thoughtSchema.virtual("reactionCount").get(function() {
  return this.reactions.length;
});

// const reactionSchema = new Schema(
//   {
//     reactionId: {
//       type: ObjectId,
//       default: true,
//     },
//     reactionBody: {
//       type: String,
//       required: true,
//       maxlength: 280,
//     },
//     username: {
//       type: String,
//       required: true,
//     },
//     createdAt: {
//       type: Date,
//       default: Date.now(),
//       // Getter to format date timestamp TODO
//     },
//   },
// )

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
