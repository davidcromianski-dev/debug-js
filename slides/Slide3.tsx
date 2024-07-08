import { Button, Card, Image } from "@nextui-org/react";
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live";

import { Slide } from "@/components/Slide";
import { Text } from "@/components/Text";

export const Slide3 = () => {
  const code = `
const MyComponent = () => {
    let x = () => {
        const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const container = document.getElementById('data-container');
                data.slice(0, 10).forEach(item => {
                    const div = document.createElement('div');
                    const title = item.title.charAt(0).toUpperCase() + item.title.slice(1);
                    const body = item.body.length > 100 ? item.body.substring(0, 100) + '...' : item.body;
                    div.innerHTML = \`<h2>\${title}</h2><p>\${body}</p>\`;
                    container.appendChild(div);
                });
            })
            .catch(error => console.error('Erro:', error));
    }
    return (
        <section>
          <Button onClick={x} variant="flat" color="primary">Buscar dados</Button>
        </section>
    );
}
render(<MyComponent/>)`;

  const scope = { Button };

  return (
    <Slide
      classNames="flex flex-row justify-evenly items-center text-ixcgray-100 gap-5"
      id={3}
    >
      <section className="text-sm flex flex-col gap-2 items-center">
        <LiveProvider noInline code={code} scope={scope}>
          <div className="flex gap-4">
            <LiveEditor
              style={{ maxHeight: "450px", overflow: "auto", width: "50vw" }}
            />
            <div className="flex flex-col gap-4 justify-between">
              <LiveError className="text-red-800 bg-red-100 mt-2 p-2 rounded" />
              <LivePreview />
              <Card className="p-4 bg-[#282A36] max-h-[600px] max-w-[500px] flex flex-row justify-center items-center border-1 border-stone-900 shadow-lg">
                <section className="w-2/3 text-left">
                  <Text className="text-white" size="lg">
                    &quot;Os erros só existem quando aparecem.&quot;
                  </Text>
                  <p className="text-md text-gray-500">
                    Extreme Go Horse - Axioma 4
                  </p>
                </section>
                <section className="w-1/3">
                  <Image
                    alt="Go Horse"
                    role="button"
                    src="https://static.wixstatic.com/media/dc6a15_716238808d854372aa15f7f3df6b797d~mv2.png/v1/fill/w_980,h_980,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/dc6a15_716238808d854372aa15f7f3df6b797d~mv2.png"
                    onClick={() =>
                      alert(
                        '<div id="data-container" className="mt-6 p-4 bg-[#282A36] max-h-[200px] border-1 border-stone-900 shadow-lg rounded overflow-auto"/>',
                      )
                    }
                  />
                </section>
              </Card>
            </div>
          </div>
        </LiveProvider>
      </section>
    </Slide>
  );
};
