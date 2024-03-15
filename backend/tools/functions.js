/**
 * Send a response request
 *
 * @param {object}
 *
 * @return {void}
 */
const send = ({
  res,
  status = HTTP_STATUS_CODES.OK,
  data = [],
  message = ''
}) =>
  res.status(status).json({ response: { status, data, message } });

const hash = {
  create: async (value) => {
    const salt = await bcrypt.genSalt(10);

    return await bcrypt.hash(value, salt);
  },
  compare: async ({ password, hash }) => {
    return await bcrypt.compare(password, hash);
  },
};

module.exports = {
  send,
  hash
};
