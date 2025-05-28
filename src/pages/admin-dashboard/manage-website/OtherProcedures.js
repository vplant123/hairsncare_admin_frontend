import 'react-quill/dist/quill.snow.css';
import React, { useEffect, useState } from "react";
import BASE_URL from "../../../Config";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";

function OtherProcedures({
  section1,
  section2,
  section3,
  section4,
  section5,
  setSection1,
  setSection2,
  setSection3,
  setSection4,
  setSection5,
}) {
  const [section5Forms, setSection5Forms] = useState([
      { title: "", link: "" },
    ]);

  const uploadImage = async (image) => {
    try {
      const formData = new FormData();
      formData.append("image", image);

      const imageResponse = await fetch(`${BASE_URL}/hair-tests/upload-image`, {
        method: "POST",
        body: formData,
      });
      if (!imageResponse.ok) {
        toast.error("Error uploading images.");
        throw new Error("Network response was not ok");
      }
      const imageData = await imageResponse.json();
      return imageData.imageUrl;
    } catch (error) {
      toast.error("Error uploading image.");
      return "";
    }
  };

  const handleSectionChange = async (sectionSetter, e, isImage = false) => {
    const { name, value, files } = e.target;
    const update = isImage
      ? { [name]: await uploadImage(files[0]) }
      : { [name]: value };
    sectionSetter((prev) => ({ ...prev, ...update }));
  };

  const handleSectionChange1 = async (name, sectionSetter, value) => {
    const update = { [name]: value };
    sectionSetter((prev) => ({ ...prev, ...update }));
  };

  const handleFormChange = async (
    formSetter,
    forms,
    sectionSetter,
    section,
    index,
    field,
    value
  ) => {
    let updatedForms;

    if (field === "image") {
      const imageUrl = await uploadImage(value);
      updatedForms = forms.map((form, i) =>
        i === index ? { ...form, [field]: imageUrl } : form
      );
    } else {
      updatedForms = forms.map((form, i) =>
        i === index ? { ...form, [field]: value } : form
      );
    }

    formSetter(updatedForms);
    sectionSetter({ ...section, forms: updatedForms });
  };

  const addForm = (formSetter, forms) => {
    const newForm = {
      title: "",
      description: "",
      image: "",
    };
    formSetter([...forms, newForm]);
  };

  const removeForm = (formSetter, forms, sectionSetter, section, index) => {
    const updatedForms = forms.filter((_, i) => i !== index);
    formSetter(updatedForms);
    sectionSetter({ ...section, forms: updatedForms });
  };

  useEffect(() => {
    if (section5.forms) {
      setSection5Forms(section5.forms);
    }
  }, [section5.forms]);

  return (
    <div
      className="container"
      style={{ display: "flex", flexDirection: "column", gap: 40 }}
    >
      <div>
        <h2>Section 1</h2>
        <div>
          <div className="form-group">
            <label>Title: </label>
            <ReactQuill
              defaultValue={section1?.title}
              onChange={(e) => handleSectionChange1("title", setSection1, e)}
            />
          </div>
          <div className="form-group">
            <label>Sub Title: </label>
            <ReactQuill
              defaultValue={section1?.subTitle}
              onChange={(e) => handleSectionChange1("subTitle", setSection1, e)}
            />
          </div>
          <div className="form-group">
            <label>Paragraph 1: </label>
            <ReactQuill
              defaultValue={section1?.desc1}
              onChange={(e) => handleSectionChange1("desc1", setSection1, e)}
            />
          </div>
          <div className="form-group">
            <label>Paragraph 2: </label>
            <ReactQuill
              defaultValue={section1?.desc2}
              onChange={(e) => handleSectionChange1("desc2", setSection1, e)}
            />
          </div>
          <div className="form-group">
            <label>Paragraph 3: </label>
            <ReactQuill
              defaultValue={section1?.desc3}
              onChange={(e) => handleSectionChange1("desc3", setSection1, e)}
            />
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <div className="form-group">
              <label>Image URL: </label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={(e) => handleSectionChange(setSection1, e, true)}
              />
            </div>
            {section1?.image ? (
              <img
                src={section1?.image}
                alt="section1"
                width={200}
                height={200}
              />
            ) : (
              <div
                style={{
                  width: 200,
                  height: 200,
                  border: "1px solid lightgray",
                }}
              >
                No Image
              </div>
            )}
          </div>
          <div className="form-group">
            <label>Alt Text: </label>
            <input
              type="text"
              name="alt"
              defaultValue={section1?.alt}
              onChange={(e) => handleSectionChange(setSection1, e)}
              placeholder="Alt Text"
            />
          </div>
        </div>
      </div>
      <div>
        <h2>Section 2</h2>
        <div>
          <div className="form-group">
            <label>Title: </label>
            <ReactQuill
              defaultValue={section2?.title}
              onChange={(e) => handleSectionChange1("title", setSection2, e)}
            />
          </div>
          <div className="form-group">
            <label>Sub Title: </label>
            <ReactQuill
              defaultValue={section2?.subTitle}
              onChange={(e) => handleSectionChange1("subTitle", setSection2, e)}
            />
          </div>
          <div className="form-group">
            <label>Paragraph 1: </label>
            <ReactQuill
              defaultValue={section2?.desc1}
              onChange={(e) => handleSectionChange1("desc1", setSection2, e)}
            />
          </div>
          <div className="form-group">
            <label>Paragraph 2: </label>
            <ReactQuill
              defaultValue={section2?.desc2}
              onChange={(e) => handleSectionChange1("desc2", setSection2, e)}
            />
          </div>
          <div className="form-group">
            <label>Paragraph 3: </label>
            <ReactQuill
              defaultValue={section2?.desc3}
              onChange={(e) => handleSectionChange1("desc3", setSection2, e)}
            />
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <div className="form-group">
              <label>Image URL: </label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={(e) => handleSectionChange(setSection2, e, true)}
              />
            </div>
            {section2?.image ? (
              <img
                src={section2?.image}
                alt="section2"
                width={200}
                height={200}
              />
            ) : (
              <div
                style={{
                  width: 200,
                  height: 200,
                  border: "1px solid lightgray",
                }}
              >
                No Image
              </div>
            )}
          </div>
          <div className="form-group">
            <label>Alt Text: </label>
            <input
              type="text"
              name="alt"
              defaultValue={section2?.alt}
              onChange={(e) => handleSectionChange(setSection2, e)}
              placeholder="Alt Text"
            />
          </div>
        </div>
      </div>
      <div>
        <h2>Section 3</h2>
        <div>
          <div className="form-group">
            <label>Title: </label>
            <ReactQuill
              defaultValue={section3?.title}
              onChange={(e) => handleSectionChange1("title", setSection3, e)}
            />
          </div>
          <div className="form-group">
            <label>Sub Title: </label>
            <ReactQuill
              defaultValue={section3?.subTitle}
              onChange={(e) => handleSectionChange1("subTitle", setSection3, e)}
            />
          </div>
          <div className="form-group">
            <label>Paragraph 1: </label>
            <ReactQuill
              defaultValue={section3?.desc1}
              onChange={(e) => handleSectionChange1("desc1", setSection3, e)}
            />
          </div>
          <div className="form-group">
            <label>Paragraph 2: </label>
            <ReactQuill
              defaultValue={section3?.desc2}
              onChange={(e) => handleSectionChange1("desc2", setSection3, e)}
            />
          </div>
          <div className="form-group">
            <label>Paragraph 3: </label>
            <ReactQuill
              defaultValue={section3?.desc3}
              onChange={(e) => handleSectionChange1("desc3", setSection3, e)}
            />
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <div className="form-group">
              <label>Image URL: </label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={(e) => handleSectionChange(setSection3, e, true)}
              />
            </div>
            {section3?.image ? (
              <img
                src={section3?.image}
                alt="section3"
                width={200}
                height={200}
              />
            ) : (
              <div
                style={{
                  width: 200,
                  height: 200,
                  border: "1px solid lightgray",
                }}
              >
                No Image
              </div>
            )}
          </div>
          <div className="form-group">
            <label>Alt Text: </label>
            <input
              type="text"
              name="alt"
              defaultValue={section3?.alt}
              onChange={(e) => handleSectionChange(setSection3, e)}
              placeholder="Alt Text"
            />
          </div>
        </div>
      </div>
      <div>
        <h2>Section 4</h2>
        <div>
          <div className="form-group">
            <label>Title: </label>
            <ReactQuill
              defaultValue={section4?.title}
              onChange={(e) => handleSectionChange1("title", setSection4, e)}
            />
          </div>
          <div className="form-group">
            <label>Sub Title: </label>
            <ReactQuill
              defaultValue={section4?.subTitle}
              onChange={(e) => handleSectionChange1("subTitle", setSection4, e)}
            />
          </div>
          <div className="form-group">
            <label>Paragraph 1: </label>
            <ReactQuill
              defaultValue={section4?.desc1}
              onChange={(e) => handleSectionChange1("desc1", setSection4, e)}
            />
          </div>
          <div className="form-group">
            <label>Paragraph 2: </label>
            <ReactQuill
              defaultValue={section4?.desc2}
              onChange={(e) => handleSectionChange1("desc2", setSection4, e)}
            />
          </div>
          <div className="form-group">
            <label>Paragraph 3: </label>
            <ReactQuill
              defaultValue={section4?.desc3}
              onChange={(e) => handleSectionChange1("desc3", setSection4, e)}
            />
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <div className="form-group">
              <label>Image URL: </label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={(e) => handleSectionChange(setSection4, e, true)}
              />
            </div>
            {section4?.image ? (
              <img
                src={section4?.image}
                alt="section4"
                width={200}
                height={200}
              />
            ) : (
              <div
                style={{
                  width: 200,
                  height: 200,
                  border: "1px solid lightgray",
                }}
              >
                No Image
              </div>
            )}
          </div>
          <div className="form-group">
            <label>Alt Text: </label>
            <input
              type="text"
              name="alt"
              defaultValue={section4?.alt}
              onChange={(e) => handleSectionChange(setSection4, e)}
              placeholder="Alt Text"
            />
          </div>
        </div>
      </div>
      <div>
        <h2>Section 5</h2>
        <div>
          {section5Forms.map((form, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                margin: "10px 0",
              }}
            >
              <div className="form-group">
                <label>Title: </label>
                <ReactQuill
                  defaultValue={form.title}
                  onChange={(e) => 
                    handleFormChange(
                      setSection5Forms,
                      section5Forms,
                      setSection5,
                      section5,
                      index,
                      "title",
                      e
                    )
                  }
                />
              </div>
              <div className="form-group">
                <label>Link: </label>
                <textarea
                  value={form.link}
                  onChange={(e) =>
                    handleFormChange(
                      setSection5Forms,
                      section5Forms,
                      setSection5,
                      section5,
                      index,
                      "link",
                      e.target.value
                    )
                  }
                  placeholder="Enter link"
                />
              </div>
              <div>
                <button
                  onClick={() =>
                    removeForm(
                      setSection5Forms,
                      section5Forms,
                      setSection5,
                      section5,
                      index
                    )
                  }
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={() => addForm(setSection5Forms, section5Forms)}
            style={{ marginTop: "10px" }}
          >
            Add Form
          </button>
        </div>
      </div>
    </div>
  );
}

export default OtherProcedures;
