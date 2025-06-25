import { AccessToken, Role } from '@huddle01/server-sdk/auth';

const roomId = 'rdn-hpzl-dhk'

const accessToken = new AccessToken({
  apiKey: process.env.HUDDLE01_API_KEY!,
  roomId,
  //available roles: Role.HOST, Role.CO_HOST, Role.SPEAKER, Role.LISTENER, Role.GUEST - depending on the privileges you want to give to the user
  role: Role.SPEAKER,
  //custom permissions give you more flexibility in terms of the user privileges than a pre-defined role
  permissions: {
    // admin: true,
    canConsume: true,
    canProduce: true,
    canProduceSources: {
      cam: true,
      mic: true,
      screen: true,
    },
    canRecvData: true,
    canSendData: true,
    canUpdateMetadata: true,
  },
  options: {
    // metadata: {
    //   // you can add any custom attributes here which you want to associate with the user
    //   walletAddress: "mizanxali.eth"
    // },
  },
});

const token = await accessToken.toJwt();

console.log(token)
