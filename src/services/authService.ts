type LoginResponse = {
    data: {
      success: boolean;
      user: {
        id: string;
        token: string;
      };
    };
  };

export const dragonLogin = async (username: string, password: string) => {
    return new Promise<LoginResponse>((resolve, reject) => {
      setTimeout(() => {
        if (username === "EDUARDO" && password === "ADMIN") {
          resolve({
            data: {
              success: true,
              user: {
                id: "1",
                token: "fake-jwt-token-123",
              },
            },
          });
        } else {
          reject({
            response: {
              status: 401,
              data: {
                success: false,
                message: "Credenciais inválidas",
              },
            },
          });
        }
      }, 200);
    });
  };

