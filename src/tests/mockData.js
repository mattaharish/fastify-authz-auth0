module.exports = {
  requestInvalidMock: {
    headers: {
      authorization: 'XYZ'
    }
  },
  requestValidMock: {
    headers: {
      authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vdXNlcmluZm8iOnsiX2lkIjoiNWQ1MjQ5MzgyNzliYjNiNjE4MjQ0OWE4N2FjZDQxMmEiLCJlbWFpbCI6ImJnb3JhaUBmYWxhYmVsbGEuY2wiLCJ1c2VyX21ldGFkYXRhIjp7InJvbGVfbmFtZSI6IkNNUF9BRE1JTiIsInJvbGVfaWQiOiJDTVAifSwiZW1haWxfdmVyaWZpZWQiOnRydWUsInVzZXJfaWQiOiJhdXRoMHw1ZDY3YTM3YmIxODQxZDBjNTIzYmEzNzcifSwiYXVkIjpbImh0dHBzOi8vY21wLWFwaSIsImh0dHBzOi8vZGV2LTU4ODA1YzJsLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJwZXJtaXNzaW9ucyI6WyJyZWFkOnByb2R1Y3QtdHlwZXMiXX0.uynY92aCbyJB9009F4pNJpKdXofg3KgoX7uJE7AClCs'
    }
  },
  replyMock: {
    code: statusCode =>
      (() => ({
        send: () => {
          expect(statusCode).toBe(403);
        }
      }))()
  }
};
