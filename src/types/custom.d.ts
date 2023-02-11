declare module '*.svg' {
  import { FC, SVGProps } from 'react';
  const svg: FC<SVGProps<SVGSVGElement>>;
  export default svg;
}

declare module '*.gql' {
  import { DocumentNode } from 'graphql';
  const value: DocumentNode;
  export default value;
}

declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_API_URL: string;
    NEXT_PUBLIC_GRAPHQL_API_URL: string;
  }
}
