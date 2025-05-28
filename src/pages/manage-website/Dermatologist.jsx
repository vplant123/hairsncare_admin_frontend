import "react-quill/dist/quill.snow.css";
import React, { useEffect, useState } from "react";
const BASE_URL = "https://backend.hairsncares.com/api/v1";
import { toast } from "@/hooks/use-toast";
import ReactQuill from "react-quill";

function Dermatologist({
  section1,
  section2,
  section3,
  section4,
  section5,
  section6,
  section7,
  section8,
  setSection1,
  setSection2,
  setSection3,
  setSection4,
  setSection5,
  setSection6,
  setSection7,
  setSection8,
}) {
  const [section3Forms, setSection3Forms] = useState([{ title: "", desc: "" }]);
  const [section4Forms, setSection4Forms] = useState([{ title: "", desc: "" }]);
  const [section8Forms, setSection8Forms] = useState([{ title: "", desc: "" }]);

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
    if (section8?.forms) {
      setSection8Forms(section8.forms);
    }
  }, [section8?.forms]);

  return (
    <div
      className=""
      style={{ display: "flex", flexDirection: "column", gap: 40 }}
    >
      <div>
        <h2>Section 1</h2>
        <div>
          <div className="form-group">
            <label>Paragraph 1: </label>
            <ReactQuill
              defaultValue={section1?.desc1}
              onChange={e => handleSectionChange1("desc1", setSection1, e)}
            />
          </div>
          <div className="form-group">
            <label>Paragraph 2: </label>
            <ReactQuill
              defaultValue={section1?.desc2}
              onChange={e => handleSectionChange1("desc2", setSection1, e)}
            />
          </div>
          <div className="form-group">
            <label>Paragraph 3: </label>
            <ReactQuill
              defaultValue={section1?.desc3}
              onChange={e => handleSectionChange1("desc3", setSection1, e)}
            />
          </div>
          <div className="form-group">
            <label>Paragraph 4: </label>
            <ReactQuill
              defaultValue={section1?.desc4}
              onChange={e => handleSectionChange1("desc4", setSection1, e)}
            />
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <div className="form-group">
              <label>Image 1: </label>
              <input
                type="file"
                name="image1"
                accept="image/*"
                onChange={e => handleSectionChange(setSection1, e, true)}
              />
            </div>
            {section1?.image1 ? (
              <img
                src={section1?.image1}
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
              name="alt1"
              defaultValue={section1?.alt1}
              onChange={e => handleSectionChange(setSection1, e)}
              placeholder="Alt Text"
            />
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <div className="form-group">
              <label>Image 2: </label>
              <input
                type="file"
                name="image2"
                accept="image/*"
                onChange={e => handleSectionChange(setSection1, e, true)}
              />
            </div>
            {section1?.image2 ? (
              <img
                src={section1?.image2}
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
              name="alt2"
              defaultValue={section1?.alt2}
              onChange={e => handleSectionChange(setSection1, e)}
              placeholder="Alt Text"
            />
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <div className="form-group">
              <label>Image 3: </label>
              <input
                type="file"
                name="image3"
                accept="image/*"
                onChange={e => handleSectionChange(setSection1, e, true)}
              />
            </div>
            {section1?.image3 ? (
              <img
                src={section1?.image3}
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
              name="alt3"
              defaultValue={section1?.alt3}
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
          <div className="form-group">
            <label>Paragraph 1: </label>
            <ReactQuill
              defaultValue={section2?.desc1}
              onChange={e => handleSectionChange1("desc1", setSection2, e)}
            />
          </div>
          <div className="form-group">
            <label>Paragraph 2: </label>
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
          <div className="form-group">
            <label>Sub Title: </label>
            <ReactQuill
              defaultValue={section4?.subTitle}
              onChange={e => handleSectionChange1("subTitle", setSection4, e)}
            />
          </div>
          <div className="form-group">
            <label>Description: </label>
            <ReactQuill
              defaultValue={section4?.desc}
              onChange={e => handleSectionChange1("desc", setSection4, e)}
            />
          </div>
          <div className="form-group">
            <label>Item Title: </label>
            <ReactQuill
              defaultValue={section4?.itemTitle}
              onChange={e => handleSectionChange1("itemTitle", setSection4, e)}
            />
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <div className="form-group">
              <label>Image URL: </label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={e => handleSectionChange(setSection4, e, true)}
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
          <div className="form-group">
            <label>Footer Text: </label>
            <input
              type="text"
              name="footerText"
              defaultValue={section4?.footerText}
              onChange={e => handleSectionChange(setSection4, e)}
              placeholder="Footer Text"
            />
          </div>
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
            <label>Paragraph 1: </label>
            <ReactQuill
              defaultValue={section5?.desc1}
              onChange={e => handleSectionChange1("desc1", setSection5, e)}
            />
          </div>
          <div className="form-group">
            <label>Paragraph 2: </label>
            <ReactQuill
              defaultValue={section5?.desc2}
              onChange={e => handleSectionChange1("desc2", setSection5, e)}
            />
          </div>
          <div className="form-group">
            <label>Paragraph 3: </label>
            <ReactQuill
              defaultValue={section5?.desc3}
              onChange={e => handleSectionChange1("desc3", setSection5, e)}
            />
          </div>
          <div className="form-group">
            <label>Paragraph 4: </label>
            <ReactQuill
              defaultValue={section5?.desc4}
              onChange={e => handleSectionChange1("desc4", setSection5, e)}
            />
          </div>
          <div className="form-group">
            <label>Paragraph 5: </label>
            <ReactQuill
              defaultValue={section5?.desc5}
              onChange={e => handleSectionChange1("desc5", setSection5, e)}
            />
          </div>
          <div className="form-group">
            <label>Item Title: </label>
            <ReactQuill
              defaultValue={section5?.title2}
              onChange={e => handleSectionChange1("title2", setSection5, e)}
            />
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <div className="form-group">
              <label>Image URL: </label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={e => handleSectionChange(setSection5, e, true)}
              />
            </div>
            {section5?.image ? (
              <img
                src={section5?.image}
                alt="section5"
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
              defaultValue={section5?.alt}
              onChange={e => handleSectionChange(setSection5, e)}
              placeholder="Alt Text"
            />
          </div>
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
            <label>Paragraph 1: </label>
            <ReactQuill
              defaultValue={section6?.desc1}
              onChange={e => handleSectionChange1("desc1", setSection6, e)}
            />
          </div>
          <div className="form-group">
            <label>Paragraph 2: </label>
            <ReactQuill
              defaultValue={section6?.desc2}
              onChange={e => handleSectionChange1("title", setSection6, e)}
            />
          </div>
          <div className="form-group">
            <label>Item Title: </label>
            <ReactQuill
              defaultValue={section6?.title2}
              onChange={e => handleSectionChange1("title2", setSection6, e)}
            />
          </div>
          <div className="form-group">
            <label>Paragraph 3: </label>
            <ReactQuill
              defaultValue={section6?.desc3}
              onChange={e => handleSectionChange1("desc3", setSection6, e)}
            />
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <div className="form-group">
              <label>Image 1: </label>
              <input
                type="file"
                name="image1"
                accept="image/*"
                onChange={e => handleSectionChange(setSection6, e, true)}
              />
            </div>
            {section6?.image1 ? (
              <img
                src={section6?.image1}
                alt="section6"
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
              defaultValue={section6?.alt1}
              onChange={e => handleSectionChange(setSection6, e)}
              placeholder="Alt Text"
            />
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <div className="form-group">
              <label>Image 2: </label>
              <input
                type="file"
                name="image2"
                accept="image/*"
                onChange={e => handleSectionChange(setSection6, e, true)}
              />
            </div>
            {section6?.image2 ? (
              <img
                src={section6?.image2}
                alt="section6"
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
              defaultValue={section6?.alt2}
              onChange={e => handleSectionChange(setSection6, e)}
              placeholder="Alt Text"
            />
          </div>
        </div>
      </div>
      <div>
        <h2>Section 7</h2>
        <div>
          <div className="form-group">
            <label>Title: </label>
            <ReactQuill
              defaultValue={section7?.title}
              onChange={e => handleSectionChange1("title", setSection7, e)}
            />
          </div>
          <div className="form-group">
            <label>Paragraph 1: </label>
            <ReactQuill
              defaultValue={section7?.desc1}
              onChange={e => handleSectionChange1("desc1", setSection7, e)}
            />
          </div>
          <div className="form-group">
            <label>Paragraph 2: </label>
            <ReactQuill
              defaultValue={section7?.desc2}
              onChange={e => handleSectionChange1("desc2", setSection7, e)}
            />
          </div>
          <div className="form-group">
            <label>Paragraph 3: </label>
            <ReactQuill
              defaultValue={section7?.desc3}
              onChange={e => handleSectionChange1("desc3", setSection7, e)}
            />
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <div className="form-group">
              <label>Image: </label>
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
      <div>
        <h2>Section 8 (Awards)</h2>
        <div>
          {section8Forms.map((form, index) => (
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
                      setSection8Forms,
                      section8Forms,
                      setSection8,
                      section8,
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
                      setSection8Forms,
                      section8Forms,
                      setSection8,
                      section8,
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
                      setSection8Forms,
                      section8Forms,
                      setSection8,
                      section8,
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
            onClick={() => addForm(setSection8Forms, section8Forms)}
            style={{ marginTop: "10px" }}
          >
            Add Form
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dermatologist;
