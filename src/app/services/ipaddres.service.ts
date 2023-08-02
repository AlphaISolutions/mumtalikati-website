import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IpService {
  publicIpAddress: string = 'Loading...';

  getPublicIpAddress(): Promise<string> {
    return new Promise((resolve, reject) => {
      const connection = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
      });

      connection.createDataChannel('');
      connection.createOffer()
        .then((sdp) => connection.setLocalDescription(sdp))
        .catch((error) => reject(error));

      connection.onicecandidate = (event) => {
        if (event.candidate) {
          const candidateStr = event.candidate.candidate;
          const ip = candidateStr.split(' ')[4];
          if (!this.isPrivateIpAddress(ip)) {
            this.publicIpAddress = ip;
            resolve(ip);
          }
        }
      };
    });
  }

  private isPrivateIpAddress(ip: string): boolean {
    const privateIpRanges = [
      /^192\.168\.\d{1,3}\.\d{1,3}$/,
      /^10\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,
      /^172\.(1[6-9]|2\d|3[0-1])\.\d{1,3}\.\d{1,3}$/,
      /^169\.254\.\d{1,3}\.\d{1,3}$/,
    ];

    return privateIpRanges.some((range) => range.test(ip));
  }
}
