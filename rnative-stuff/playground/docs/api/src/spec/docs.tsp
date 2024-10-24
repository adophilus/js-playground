import "@typespec/rest";

using TypeSpec.Http;

@service({
  title: "API Documentation",
})
namespace ApiDocs;

@example("f47ac10b-58cc-4372-a567-0e02b2c3d479")
scalar Id extends string;

@example("2021-09-01T12:00:00Z")
scalar Date extends string;

@route("/api")
@doc("API")
namespace Api {

  @error
  model UnexpectedError {
    @statusCode code: 500;
    @example("An unexpected error occurred")
    message: string;
  }

  @error
  model BadRequestError {
    @statusCode code: 400;
    @example("Invalid data")
    message: string;
  }
  
  @error
  model UnauthorizedError {
    @statusCode code: 401;
    @example("Unauthorized")
    message: string;
  }

  @tag("Auth")
  @route("/auth")
  namespace Authentication {

    model SignInPayload {
      @example("mary.slessor@mail.com")
      email: string;
      @example("$3cureP@ssw0rd")
      password: string;
    }

    model SignUpPayload {
      @example("mary.slessor")
      username: string;
      @example("mary.slessor@mail.com")
      email: string;
      @example("$3cureP@ssw0rd")
      password: string;
    } 
    
    model SendResetPasswordEmailPayload {
      @example("mary.slessor@mail.com")
      email: string
    }

    model ResetPasswordPayload {
      @example("mary.slessor@mail.com")
      email: string;
      @example("NewP@ssw0rd")
      password: string
    }
    
    @doc("Authentication token")
    model AuthCredentials {
      @example("745731af4484f323968969eda289aeee")
      token: string;
    }

    model WelcomeMessage {
      @example("Please check your email address for a verification code")
      message: string;
    }
    
    model VerifyEmailPayload {
      @example("mary.slessor@mail.com")
      email: string;
      @example("123456")
      otp: string;
    }

    model VerificationSuccessful {
      @example("Email verified successfully")
      message: string;
    }
    
    model ResendVerificationEmailPayload {
      @example("mary.slessor@mail.com")
      email: string
    }
    
    model SignOutSuccessful {
      @example("Sign out successful")
      message: string;
    }
    
    model User {
      @example("73ffff2a-413c-4283-bec9-a43cb1e82411")
      id: string;
      @example("mary.slessor@mail.com")
      email: string;
      @example("mary.slessor")
      username: string;
    }
    
    @route("/sign-up")
    @post
    @doc("Sign up new user")
    op signUp(@body payload: SignUpPayload): WelcomeMessage | BadRequestError | UnexpectedError;
    
    @route("/verify-email")
    @post
    @doc("Verify email address")
    op verifyEmail(@body payload: VerifyEmailPayload): VerificationSuccessful | BadRequestError | UnexpectedError;
    
    @route("/resend-verification-email")
    @post
    @doc("Resend verification email")
    op resendVerificationEmail(@body payload: ResendVerificationEmailPayload): WelcomeMessage | BadRequestError | UnexpectedError;

    @route("/sign-in")
    @post
    @doc("Sign in user")
    op signIn(@body payload: SignInPayload): AuthCredentials | BadRequestError | UnexpectedError;

    @route("/reset-password/send-email")
    @post
    @doc("Send reset password email")
    op sendResetPasswordEmail(@body payload: SendResetPasswordEmailPayload): WelcomeMessage | BadRequestError | UnexpectedError;

    @route("/reset-password")
    @put
    @doc("Reset password")
    op resetPassword(@body payload: ResetPasswordPayload): WelcomeMessage | BadRequestError | UnexpectedError;

    @route("/sign-out")
    @doc("Sign out user")
    op signOut(): SignOutSuccessful | UnexpectedError;
    
    @route("/profile")
    @doc("Get user profile")
    @useAuth(BearerAuth)
    op getProfile(): User | UnauthorizedError | UnexpectedError;
  }
  
  @tag("Exchange")
  @route("/exchange")
  @useAuth(BearerAuth)
  namespace Exchange {
    model ExchangeRates {
      @example("2021-09-01T12:00:00Z")
      date: Date;
      @example("USD")
      base: string;
      @example("EUR")
      target: string;
      @example(0.85)
      rate: float;
    }
    
    @route("/rates")
    @doc("Get exchange rates")
    op getExchangeRates(): ExchangeRates | UnexpectedError;
  }
}