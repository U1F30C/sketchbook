// Ejemplo de scrapper: entra a https://en.wikipedia.org/wiki/Wikipedia:Contents/Categories y corre este script en la consola del navegador


const dataObject = Array.from(document.getElementsByClassName("hlist"))
    .map(hlistElement => hlistElement.children[0])
    .map(ulElement => ulElement.children)
    .map(ilElements =>
        Array.from(ilElements) 
            .map(ilElement =>
                ilElement.children[0]
            )
            .map(aElement => ({ href: aElement?.href, title: aElement?.innerHTML }))
    )
console.log(JSON.stringify(dataObject, null, 2))


// Creación del scrapper
// Inspecciona la página y observa la estructura del documento
// En este caso los datos que quiero extraer (links) tienen una estructura así (excepto los títulos, son casos especiales, tienes que manejar que a veces hay ruido en la estructura):
// <div class="hlist">
//     <ul>
//         <li>
//             <a>
// 
//             </a>
//         </li>
//     </ul>
// </div>


// Cada grupo con links es de clase "hlist", entonces los buscamos por su nombre de clase

// const dataObject = Array.from(document.getElementsByClassName("hlist")) //arreglo de elementos hlist
//     .map(hlistElement => hlistElement.children[0]) // el único hijo (con etiqueta "ul") de cada grupo
//     .map(ulElement => ulElement.children) // elementos con etiqueta "il"
//     .map(ilElements =>
//         Array.from(ilElements)  // convertidos a arreglo porque son una HTMLCollection, y luego mapeados 
//             .map(ilElement =>
//                 ilElement.children[0] // el único hijo (con etiqueta "a") de cada elemento "ul"
//             )
//             .map(aElement => ({ href: aElement?.href, title: aElement?.innerHTML })) // un objeto con los datos que me importan
//     )
// dataObject es un arreglo que contiene la información relevante
// console.log(JSON.stringify(dataObject, null, 2)) // imprimir como json para mas placer
