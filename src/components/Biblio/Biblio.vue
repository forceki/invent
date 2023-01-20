<template>
  <div
    class="max-h-full min-h-full relative flex-1 bg-[#333333] overflow-auto rounded shadow-lg"
  >
    <input
      class="sticky top-0 left-0 z-10 w-full"
      id="test"
      min="1"
      max="9"
      value="9"
      step="1"
      @change="
        (e) => {
          pdfView.scale = e.target.value;
        }
      "
      type="range"
    />
    <div
      @click="printNow"
      :style="
        'transform: scale(0.' + pdfView.scale + ');' + 'transform-origin: 0% 0% 0px;'
      "
      v-html="htmlVariable(props.book, props.dictionary)"
      id="printThis"
      class="flex flex-col justify-center align-center"
    ></div>
  </div>
</template>

<script setup lang="ts">
// Import
import { reactive } from "@vue/reactivity";

// Interfaces
interface IPropsModel {
  root?: boolean;
  book: string;
  customStyle?: string;
  dictionary?: any;
}
interface IPDFViewModel {
  scale: number;
  view?: string;
}

// Reactive declarations
const pdfView: IPDFViewModel = reactive({
  scale: 9,
});

// Props declarations
const props = withDefaults(defineProps<IPropsModel>(), {
  book: '<div class="page">' + "||GREETINGS||" + "</div>",
  dictionary: [
    {
      GREETINGS: "Hello, World!",
    },
  ],
  root: false,
  customStyle: ''
});

// Functions
const htmlVariable = (html: string, dict: any) => {
  dict.map((diction: Object) => {
    console.log(diction);
    {
      html = html.replaceAll(
        "||" + Object.keys(diction)[0] + "||",
        Object.values(diction)[0]
      );
    }
  });
  return html;
};
const printNow = () => {
  // Function to print pdf triggered on line 5
  // This function uses html selector to select element 'printThis' and put its innerHtml to a makeshift body tag
  // Variable declarations
  var divContents = document.getElementById("printThis").innerHTML;

  if (props.root != false) {
    console.log("if true");
    var a = window.open("", "", "height=500, width=500");
    a.document.write(htmlVariable(props.book, props.dictionary));
    a.print();
    return;
  } else {
    console.log("run around in circles");
    var a = window.open("", "", "height=500, width=500");

    // Process
    a.document.write("<html>");

    a.document.write(
      '<style type="text/css" media="print">' +
        "@page " +
        "{ " +
        "size: auto;" /* auto is the main current active printer page size */ +
        "margin: 0mm;" /* this small affects the margin in the printer IMP settings */ +
        "} " +
                props.customStyle +

       " body " +
        "{ " +
        "background-color:#FFFFFF; " +
        "margin: 0px; " +
        "} " +
        "</style>"
    );
    a.document.write("<body>");
    a.document.write(divContents);
    a.document.write("</body></html>");
    a.document.close();

    // Function to print a pdf which contained the makeshift body tag
    a.print();
  }
};
</script>

<style scoped>
html {
  margin: 0 6cm;
}
:deep() * {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
}
:deep() .page * {
  all: revert;
}
:deep() .page {
  all: revert;
  width: 210mm;
  min-height: 297mm;
  padding: 20mm;
  margin: 10mm auto;
  border: 1px #d3d3d3 solid;
  border-radius: 5px;
  background: white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
:deep() .subpage {
  padding: 1cm;
  border: 5px red solid;
  height: 257mm;
  outline: 2cm #ffeaea solid;
}
@page {
  size: A4;
  margin: 0;
}
@media print {
  .footer,
  #non-printable {
    display: none !important;
  }
  #printable {
    display: block;
  }
  html,
  body {
    width: 210mm;
    height: 297mm;
  }
  @page {
    size: auto;
    margin: 0.5rem 0;
  }
  body {
    margin: 1.6cm;
  }

  :deep() .page {
    margin: 100px;
    border: initial;
    border-radius: initial;
    width: initial;
    min-height: initial;
    box-shadow: initial;
    background: initial;
    page-break-after: always;
  }
}
</style>
