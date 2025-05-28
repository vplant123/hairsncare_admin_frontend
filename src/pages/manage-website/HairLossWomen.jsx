import "react-quill/dist/quill.snow.css";
import React, { useEffect, useState } from "react";
const BASE_URL = "https://backend.hairsncares.com/api/v1";
import { toast } from "@/hooks/use-toast";
import ReactQuill from "react-quill";

function HairLossWomen({
  section1,
  section2,
  section3,
  section4,
  section5,
  section6,
  section7,
  setSection1,
  setSection2,
  setSection3,
  setSection4,
  setSection5,
  setSection6,
  setSection7,
}) {
  const [section3Forms, setSection3Forms] = useState([
    { title: "", description: "", image: "" },
  ]);

  const [section4Forms, setSection4Forms] = useState([
    { title: "", description: "", image: "" },
  ]);

  const [section5Forms, setSection5Forms] = useState([
    { title: "", description: "" },
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
    if (section3.forms) {
      setSection3Forms(section3.forms);
    }
  }, [section3.forms]);

  useEffect(() => {
    if (section4.forms) {
      setSection4Forms(section4.forms);
    }
  }, [section4.forms]);

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
              onChange={e => handleSectionChange1("title", setSection1, e)}
            />
          </div>
          <div className="form-group">
            <label>Sub Title: </label>
            <ReactQuill
              defaultValue={section1?.subTitle}
              onChange={e => handleSectionChange1("subTitle", setSection1, e)}
            />
          </div>
          <div className="form-group">
            <label>Description: </label>
            <ReactQuill
              defaultValue={section1?.desc}
              onChange={e => handleSectionChange1("desc", setSection1, e)}
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
          <div className="form-group">
            <label>Sub Title: </label>
            <ReactQuill
              defaultValue={section2?.subTitle}
              onChange={e => handleSectionChange1("subTitle", setSection2, e)}
            />
          </div>
          <div className="form-group">
            <label>Description: </label>
            <ReactQuill
              defaultValue={section2?.desc}
              onChange={e => handleSectionChange1("desc", setSection2, e)}
            />
          </div>
          <div className="form-group">
            <label>Description1: </label>
            <ReactQuill
              defaultValue={section2?.desc1}
              onChange={e => handleSectionChange1("desc1", setSection2, e)}
            />
          </div>
          <div className="form-group">
            <label>Description2: </label>
            <ReactQuill
              defaultValue={section2?.desc2}
              onChange={e => handleSectionChange1("desc2", setSection2, e)}
            />
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <div className="form-group">
              <label>Image URL: </label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={e => handleSectionChange(setSection2, e, true)}
              />
            </div>
            {section2?.image ? (
              <img
                src={section2?.image}
                alt="section2"
                width={200}
                height={200}
                style={{ border: "1px solid black" }}
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
              onChange={e => handleSectionChange(setSection2, e)}
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
              onChange={e => handleSectionChange1("title", setSection3, e)}
            />
          </div>
          <div className="form-group">
            <label>Sub Title: </label>
            <ReactQuill
              defaultValue={section3?.subTitle}
              onChange={e => handleSectionChange1("subTitle", setSection3, e)}
            />
          </div>
          <div className="form-group">
            <label>Description: </label>
            <ReactQuill
              defaultValue={section3?.desc}
              onChange={e => handleSectionChange1("desc", setSection3, e)}
            />
          </div>
          <div className="form-group">
            <label>Footer Text: </label>
            <ReactQuill
              defaultValue={section3?.footerText}
              onChange={e => handleSectionChange1("footerText", setSection3, e)}
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
                  defaultValue={form.description}
                  onChange={e =>
                    handleFormChange(
                      setSection3Forms,
                      section3Forms,
                      setSection3,
                      section3,
                      index,
                      "description",
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
                        setSection3Forms,
                        section3Forms,
                        setSection3,
                        section3,
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
            <label>Title: </label>{" "}
            <ReactQuill
              defaultValue={section4?.title}
              onChange={e => handleSectionChange1("title", setSection4, e)}
            />
          </div>
          <div className="form-group">
            <label>Sub Title: </label>{" "}
            <ReactQuill
              defaultValue={section4?.subTitle}
              onChange={e => handleSectionChange1("subTitle", setSection4, e)}
            />
          </div>
          <div className="form-group">
            <label>Description: </label>{" "}
            <ReactQuill
              defaultValue={section4?.desc}
              onChange={e => handleSectionChange1("desc", setSection4, e)}
            />
          </div>
          <div className="form-group">
            <label>Footer Text: </label>{" "}
            <ReactQuill
              defaultValue={section4?.footerText}
              onChange={e => handleSectionChange1("footerText", setSection4, e)}
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
              <div className="form-group">
                <label>Image URL: </label>
                <div style={{ display: "flex", gap: 10 }}>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={e =>
                      handleFormChange(
                        setSection4Forms,
                        section4Forms,
                        setSection4,
                        section4,
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
            <label>Sub Title: </label>
            <ReactQuill
              defaultValue={section5?.subTitle}
              onChange={e => handleSectionChange1("subTitle", setSection5, e)}
            />
          </div>
          <div className="form-group">
            <label>Description: </label>
            <ReactQuill
              defaultValue={section5?.desc}
              onChange={e => handleSectionChange1("desc", setSection5, e)}
            />
          </div>
          <div className="form-group">
            <label>Footer Text: </label>
            <ReactQuill
              defaultValue={section5?.footerText}
              onChange={e => handleSectionChange1("footerText", setSection5, e)}
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
                  defaultValue={form.description}
                  onChange={e =>
                    handleFormChange(
                      setSection5Forms,
                      section5Forms,
                      setSection5,
                      section5,
                      index,
                      "description",
                      e
                    )
                  }
                />
              </div>
              <div className="form-group">
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
      <div>
        <h2>Section 6</h2>
        <div>
          <div className="form-group">
            <label>Title: </label>
            <ReactQuill
              defaultValue={section6?.title}
              onChange={e => handleSectionChange1("title", setSection6, e)}
            />
          </div>
          <div className="form-group">
            <label>Sub Title: </label>
            <ReactQuill
              defaultValue={section6?.subTitle}
              onChange={e => handleSectionChange1("subTitle", setSection6, e)}
            />
          </div>
          <div className="form-group">
            <label>Description: </label>
            <ReactQuill
              defaultValue={section6?.desc}
              onChange={e => handleSectionChange1("desc", setSection6, e)}
            />
          </div>
          <div className="form-group">
            <label>Footer Text: </label>
            <ReactQuill
              defaultValue={section6?.footerText}
              onChange={e => handleSectionChange1("footerText", setSection6, e)}
            />
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <div className="form-group">
              <label>Image URL: </label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={e => handleSectionChange(setSection6, e, true)}
              />
            </div>
            {section6?.image ? (
              <img
                src={section6?.image}
                alt="section6"
                width={200}
                height={200}
                style={{ border: "1px solid black" }}
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
          <input
            type="text"
            name="alt"
            defaultValue={section6?.alt}
            onChange={e => handleSectionChange(setSection6, e)}
            placeholder="Alt Text"
          />
        </div>
      </div>
      <div>
        <h2>Section 7</h2>
        <div>
          <div className="form-group">
            <label>Description: </label>
            <ReactQuill
              defaultValue={section7?.desc}
              onChange={e => handleSectionChange1("desc", setSection7, e)}
            />
          </div>
          <div className="form-group">
            <label>Footer Text: </label>
            <ReactQuill
              defaultValue={section7?.footerText}
              onChange={e => handleSectionChange1("footerText", setSection7, e)}
            />
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <div className="form-group">
              <label>Image URL: </label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={e => handleSectionChange(setSection7, e, true)}
              />
            </div>
            {section7?.image ? (
              <img
                src={section7?.image}
                alt="section7"
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
              defaultValue={section7?.alt}
              onChange={e => handleSectionChange(setSection7, e)}
              placeholder="Alt Text"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HairLossWomen;
