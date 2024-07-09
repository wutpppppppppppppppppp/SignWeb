export default (request, reply, done) => {
  console.log(`${request.method} ${request.url}`);
  done();
};
