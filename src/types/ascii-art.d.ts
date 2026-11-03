// The <ascii-art> custom element from the self-hosted ASCII Magic player (public/ascii-magic-art)
import 'react';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'ascii-art': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        piece: string;
        size?: number | string;
        speed?: number | string;
        mono?: '' | boolean;
        still?: '' | boolean;
      };
    }
  }
}
