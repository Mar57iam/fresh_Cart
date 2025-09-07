  export type LoginValues = {
      email:string,
      password:string
    }

    

    export type RegisterValues = {
      name:string,
      email:string,
      password:string,
      rePassword:string,
      phone:string
    }


  export interface AuthContextType {
  registerFn: (values: RegisterValues) => Promise<void>;
  loginFn: (values: LoginValues) => Promise<void>;
  errorMessage: string;
  isLoading: boolean;
  token: string | null;
  logOut: () => void;
}

