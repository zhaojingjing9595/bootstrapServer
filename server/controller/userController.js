export const signUp = async (req, res, next) => {
  try {
      const { username, password } = req.body;
      
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
  } catch (error) {
    next(error);
  }
};
