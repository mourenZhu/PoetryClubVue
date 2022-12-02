// @ts-ignore
import SockJS from 'sockjs-client/dist/sockjs';
import { CompatClient, Stomp } from '@stomp/stompjs';
import { getAuthorization } from '@/utils/auth';

export default function stompClient(): CompatClient {
  const socket = SockJS('http://localhost:3000/ws');
  const client = Stomp.over(socket);
  // client.connect(
  //     {
  //         'Authorization': getAuthorization()
  //     }, // headers头部信息。可添加客户端的认证信息。也可以不添加信息，headers 直接就设置为 {}
  //     (frame: any) => {
  //         console.log("stomp 连接成功", frame)
  //         // 连接成功： 订阅服务器的地址。为了浏览器可以接收到消息，必须先订阅服务器的地址
  //         client.subscribe('/topic/greetings', function (greeting) {
  //             console.log('消息', greeting);
  //         });
  //         client.send("/app/hello", {}, JSON.stringify('zhumouren'));
  //     }, (err: any) => {
  //         console.log("stomp 连接失败")
  //         // 连接失败的回调
  //     });
  return client;
}
