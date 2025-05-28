import "react-quill/dist/quill.snow.css";
import React, { useEffect, useState } from "react";
const BASE_URL = "https://backend.hairsncares.com/api/v1";
import { toast } from "@/hooks/use-toast";
import ReactQuill from "react-quill";

function HairLossMen({
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
  const [section2Forms, setSection2Forms] = useState([{ title: "", desc: "" }]);
  const [section3Forms, setSection3Forms] = useState([{ title: "", desc: "" }]);
  const [section4Forms, setSection4Forms] = useState([{ title: "", desc: "" }]);
  const [section5Forms, setSection5Forms] = useState([
    { title: "", desc: "", image: "" },
  ]);

  const uploadImage = async image => {
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
    sectionSetter(prev => ({ ...prev, ...update }));
  };

  const handleSectionChange1 = async (name, sectionSetter, value) => {
    const update = { [name]: value };
    sectionSetter(prev => ({ ...prev, ...update }));
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
      desc: "",
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
    if (section2?.forms) {
      setSection2Forms(section2.forms);
    }
  }, [section2?.forms]);

  useEffect(() => {
    if (section3?.forms) {
      setSection3Forms(section3.forms);
    }
  }, [section3?.forms]);

  useEffect(() => {
    if (section4?.forms) {
      setSection4Forms(section4.forms);
    }
  }, [section4?.forms]);

  useEffect(() => {
    if (section5?.forms) {
      setSection5Forms(section5.forms);
    }
  }, [section5?.forms]);

  return (
    <div
      className="container"
      style={{ display: "flex", flexDirection: "column", gap: 40 }}
    >
      <div>
        <h2>Section 1</h2>
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <ReactQuill
              defaultValue={section1?.title}
              onChange={e => handleSectionChange1("title", setSection1, e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="desc">Description</label>
            <ReactQuill
              defaultValue={section1?.desc}
              onChange={e => handleSectionChange1("desc", setSection1, e)}
            />
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <div className="form-group">
              <label>Image URL: </label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={e => handleSectionChange(setSection1, e, true)}
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
              onChange={e => handleSectionChange(setSection1, e)}
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
              onChange={e => handleSectionChange1("title", setSection2, e)}
            />
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <div className="form-group">
              <label>Image 1: </label>
              <input
                type="file"
                name="image1"
                accept="image/*"
                onChange={e => handleSectionChange(setSection2, e, true)}
              />
            </div>
            {section2?.image1 ? (
              <img
                src={section2?.image1}
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
              name="alt1"
              defaultValue={section2?.alt1}
              onChange={e => handleSectionChange(setSection2, e)}
              placeholder="Alt Text"
            />
          </div>
          <div className="form-group">
            <label>Image 2: </label>
            <div style={{ display: "flex", gap: 10 }}>
              <input
                type="file"
                name="image2"
                accept="image/*"
                onChange={e => handleSectionChange(setSection2, e, true)}
              />
            </div>
            {section2?.image2 ? (
              <img
                src={section2?.image2}
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
              name="alt2"
              defaultValue={section2?.alt2}
              onChange={e => handleSectionChange(setSection2, e)}
              placeholder="Alt Text"
            />
          </div>
          {section2Forms.map((form, index) => (
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
                  onChange={e =>
                    handleFormChange(
                      setSection2Forms,
                      section2Forms,
                      setSection2,
                      section2,
                      index,
                      "title",
                      e
                    )
                  }
                />
              </div>
              <div className="form-group">
                <label>Description: </label>
                <ReactQuill
                  defaultValue={form.desc}
                  onChange={e =>
                    handleFormChange(
                      setSection2Forms,
                      section2Forms,
                      setSection2,
                      section2,
                      index,
                      "desc",
                      e
                    )
                  }
                />
              </div>
              <div>
                <button
                  onClick={() =>
                    removeForm(
                      setSection2Forms,
                      section2Forms,
                      setSection2,
                      section2,
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
            onClick={() => addForm(setSection2Forms, section2Forms)}
            style={{ marginTop: "10px" }}
          >
            Add Form
          </button>
        </div>
      </div>
      <div>
        <h2>Section 3</h2>
        <div>
          <div className="form-group">
            <label>Title: </label>
            <ReactQuill
              defaultValue={section3?.title}
              onChange={e => handleSectionChange1("title", setSection3, e)}
            />
          </div>
          <div className="form-group">
            <label>Description: </label>
            <ReactQuill
              defaultValue={section3?.desc}
              onChange={e => handleSectionChange1("desc", setSection3, e)}
            />
          </div>
          {section3Forms.map((form, index) => (
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
                  onChange={e =>
                    handleFormChange(
                      setSection3Forms,
                      section3Forms,
                      setSection3,
                      section3,
                      index,
                      "title",
                      e
                    )
                  }
                />
              </div>
              <div className="form-group">
                <label>Description: </label>
                <ReactQuill
                  defaultValue={form.desc}
                  onChange={e =>
                    handleFormChange(
                      setSection3Forms,
                      section3Forms,
                      setSection3,
                      section3,
                      index,
                      "desc",
                      e
                    )
                  }
                />
              </div>
              <div>
                <button
                  onClick={() =>
                    removeForm(
                      setSection3Forms,
                      section3Forms,
                      setSection3,
                      section3,
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
            onClick={() => addForm(setSection3Forms, section3Forms)}
            style={{ marginTop: "10px" }}
          >
            Add Form
          </button>
        </div>
      </div>
      <div>
        <h2>Section 4</h2>
        <div>
          <div className="form-group">
            <label>Title: </label>
            <ReactQuill
              defaultValue={section4?.title}
              onChange={e => handleSectionChange1("title", setSection4, e)}
            />
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <div className="form-group">
              <label>Image URL: </label>
              <input
                type="file"
                name="image1"
                accept="image/*"
                onChange={e => handleSectionChange(setSection4, e, true)}
              />
            </div>
            {section4?.image1 ? (
              <img
                src={section4?.image1}
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
              name="alt1"
              defaultValue={section4?.alt1}
              onChange={e => handleSectionChange(setSection4, e)}
              placeholder="Alt Text"
            />
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <div className="form-group">
              <label>Image URL: </label>
              <input
                type="file"
                name="image2"
                accept="image/*"
                onChange={e => handleSectionChange(setSection4, e, true)}
              />
            </div>
            {section4?.image2 ? (
              <img
                src={section4?.image2}
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
              name="alt2"
              defaultValue={section4?.alt2}
              onChange={e => handleSectionChange(setSection4, e)}
              placeholder="Alt Text"
            />
          </div>
          {section4Forms.map((form, index) => (
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
                  onChange={e =>
                    handleFormChange(
                      setSection4Forms,
                      section4Forms,
                      setSection4,
                      section4,
                      index,
                      "title",
                      e
                    )
                  }
                />
              </div>
              <div className="form-group">
                <label>Description: </label>
                <ReactQuill
                  defaultValue={form.desc}
                  onChange={e =>
                    handleFormChange(
                      setSection4Forms,
                      section4Forms,
                      setSection4,
                      section4,
                      index,
                      "desc",
                      e
                    )
                  }
                />
              </div>
              <div>
                <button
                  onClick={() =>
                    removeForm(
                      setSection4Forms,
                      section4Forms,
                      setSection4,
                      section4,
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
            onClick={() => addForm(setSection4Forms, section4Forms)}
            style={{ marginTop: "10px" }}
          >
            Add Form
          </button>
        </div>
      </div>
      <div>
        <h2>Section 5</h2>
        <div>
          <div className="form-group">
            <label>Title: </label>
            <ReactQuill
              defaultValue={section5?.title}
              onChange={e => handleSectionChange1("title", setSection5, e)}
            />
          </div>
          <div className="form-group">
            <label>Description: </label>
            <ReactQuill
              defaultValue={section5?.desc}
              onChange={e => handleSectionChange1("desc", setSection5, e)}
            />
          </div>
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
                  onChange={e =>
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
                <label>Description: </label>
                <ReactQuill
                  defaultValue={form.desc}
                  onChange={e =>
                    handleFormChange(
                      setSection5Forms,
                      section5Forms,
                      setSection5,
                      section5,
                      index,
                      "desc",
                      e
                    )
                  }
                />
              </div>
              <div className="form-group">
                <label>Image URL: </label>
                <div style={{ display: "flex", gap: 10 }}>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={e =>
                      handleFormChange(
                        setSection5Forms,
                        section5Forms,
                        setSection5,
                        section5,
                        index,
                        "image",
                        e.target.files[0]
                      )
                    }
                  />
                  {form.image ? (
                    <img src={form.image} alt="form" width={200} height={200} />
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

export default HairLossMen;
