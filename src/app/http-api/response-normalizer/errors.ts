export const APPLICATION_ERRORS = {
  MOVIES: {
    NOT_FOUND_ERROR: {
      message: 'The movie with the specified ID was not found in the database.',
      statusCode: 404,
    },
  },
  GENERIC: {
    SERVER_ERROR: {
      message: 'Internal Server Error',
      statusCode: 500,
    },
  },
}
