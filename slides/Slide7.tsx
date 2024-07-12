import { atomOneDark, CodeBlock } from "react-code-blocks";
import { SiEsbuild, SiRollupdotjs, SiVite, SiWebpack } from "react-icons/si";
import Link from "next/link";

import { Slide } from "@/components/Slide";

export const Slide7 = () => {
  const code = `const path = require('path');

module.exports = {
    //devtool: 'eval-source-map', // development
    devtool: 'source-map', // production
    entry: './src/main.js',
    mode: 'production', // 'development' or 'production
    resolve: {
        extensions: ['.js']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
};
`;

  return (
    <Slide
      classNames="flex flex-col justify-center items-start text-start gap-10 text-ixcgray-200"
      id={7}
    >
      <div>
        <h1 className="font-bold text-4xl">
          O código está todo em uma só linha, e agora? &#128557;
        </h1>
      </div>
      <section className="flex gap-10">
        <CodeBlock
          showLineNumbers
          highlight={"4,5"}
          language="javascript"
          text={code}
          theme={atomOneDark}
        />
        <div className="flex justify-center items-center gap-4">
          <Link
            href="https://webpack.js.org/configuration/devtool/"
            target="_blank"
          >
            <SiWebpack className="text-warning text-8xl" />
          </Link>

          <Link
            href="https://vitejs.dev/config/build-options#build-sourcemap"
            target="_blank"
          >
            <SiVite className="text-primary text-8xl" />
          </Link>

          <Link
            href="https://rollupjs.org/configuration-options/#output-sourcemap"
            target="_blank"
          >
            <SiRollupdotjs className="text-danger text-8xl" />
          </Link>

          <Link href="https://esbuild.github.io/api/#sourcemap" target="_blank">
            <SiEsbuild className="text-success text-8xl" />
          </Link>
        </div>
      </section>
    </Slide>
  );
};
