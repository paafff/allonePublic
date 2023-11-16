// import ReactQuill from 'react-quill';

// export default function Editor({ value, onChange }) {
//   const modules = {
//     toolbar: [
//       [{ header: [1, 2, false] }],
//       ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//       [
//         { list: 'ordered' },
//         { list: 'bullet' },
//         { indent: '-1' },
//         { indent: '+1' },
//       ],
//       ['link', 'image'],
//       ['clean'],
//     ],
//   };
//   return (
//     <div className="content">
//       <ReactQuill
//         value={value}
//         theme={'snow'}
//         onChange={onChange}
//         modules={modules}
//       />
//     </div>
//   );
// }

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import styles

export default function Editor({ value, onChange }) {
  const modules = {
    toolbar: [
      [{ font: [] }, { size: [] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ script: 'sub' }, { script: 'super' }],
      ['blockquote', 'code-block'],
      [{ header: '1' }, { header: '2' }],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      // ['direction', { align: [] }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  return (
    <div className="content">
      <ReactQuill
        value={value}
        theme={'snow'}
        onChange={onChange}
        modules={modules}
      />
    </div>
  );
}
