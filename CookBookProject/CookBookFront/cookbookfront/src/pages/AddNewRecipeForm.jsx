import React, { useState } from "react";
import axios from "axios";

const SubmitRecipe = ({ onRecipeAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    dishType: "MAIN_COURSE",
    prepTime: "",
    ingredients: [{ name: "" }],
    steps: [{ step: "" }],
    image: null
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (arrayName, index, value) => {
    setFormData(prev => {
      const newArray = [...prev[arrayName]];
      newArray[index] = { ...newArray[index], [arrayName === 'ingredients' ? 'name' : 'step']: value };
      return { ...prev, [arrayName]: newArray };
    });
  };

  const addField = (arrayName) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: [...prev[arrayName], arrayName === 'ingredients' ? { name: "" } : { step: "" }]
    }));
  };

  const removeField = (arrayName, index) => {
    if (formData[arrayName].length > 1) {
      setFormData(prev => ({
        ...prev,
        [arrayName]: prev[arrayName].filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const recipeData = {
        name: formData.name,
        description: formData.description,
        dishType: formData.dishType,
        prepTime: formData.prepTime,
        ingredientList: formData.ingredients,
        steps: formData.steps
      };

      const response = await axios.post("http://localhost:8090/api/dishes/add/noAuth", recipeData);
      
      if (formData.image) {
        const formDataImg = new FormData();
        formDataImg.append("image", formData.image);
        await axios.patch(
          `http://localhost:8090/api/dishes/${response.data.name}/image`,
          formDataImg
        );
      }

      setSuccess("Recipe submitted successfully!");
      if (onRecipeAdded) {
        onRecipeAdded();
      }
      setError("");
      setFormData({
        name: "",
        description: "",
        dishType: "MAIN_COURSE",
        prepTime: "",
        ingredients: [{ name: "" }],
        steps: [{ step: "" }],
        image: null
      });
    } catch (err) {
      setError(err.response?.data?.message || "Error submitting recipe");
      setSuccess("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Share Your Recipe</h1>
        <p style={styles.subtitle}>Fill in the details to add your culinary creation</p>

        {error && <div style={styles.error}>{error}</div>}
        {success && <div style={styles.success}>{success}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Basic Info Section */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Basic Information</h2>
            <div style={styles.grid}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Recipe Name*</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={styles.input}
                  placeholder="e.g. Creamy Garlic Pasta"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Dish Type*</label>
                <select
                  name="dishType"
                  value={formData.dishType}
                  onChange={handleChange}
                  style={styles.input}
                >
                  <option value="MAIN_COURSE">Main Course</option>
                  <option value="SALAD">Salad</option>
                  <option value="APPETIZER">Appetizer</option>
                  <option value="DESSERT">Dessert</option>
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Prep Time*</label>
                <input
                  type="text"
                  name="prepTime"
                  value={formData.prepTime}
                  onChange={handleChange}
                  required
                  style={styles.input}
                  placeholder="e.g. 30 mins"
                />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Description*</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                style={{ ...styles.input, ...styles.textarea }}
                placeholder="Describe your recipe..."
                rows={4}
              />
            </div>
          </div>

          {/* Ingredients Section */}
          <div style={styles.section}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>Ingredients</h2>
              <button
                type="button"
                onClick={() => addField('ingredients')}
                style={styles.addButton}
              >
                + Add Ingredient
              </button>
            </div>
            
            {formData.ingredients.map((ingredient, index) => (
              <div key={index} style={styles.arrayItem}>
                <input
                  type="text"
                  value={ingredient.name}
                  onChange={(e) => handleArrayChange('ingredients', index, e.target.value)}
                  required
                  style={styles.input}
                  placeholder={`Ingredient ${index + 1}`}
                />
                {formData.ingredients.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeField('ingredients', index)}
                    style={styles.removeButton}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Steps Section */}
          <div style={styles.section}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>Preparation Steps</h2>
              <button
                type="button"
                onClick={() => addField('steps')}
                style={styles.addButton}
              >
                + Add Step
              </button>
            </div>
            
            {formData.steps.map((step, index) => (
              <div key={index} style={styles.arrayItem}>
                <div style={styles.stepNumber}>{index + 1}.</div>
                <textarea
                  value={step.step}
                  onChange={(e) => handleArrayChange('steps', index, e.target.value)}
                  required
                  style={{ ...styles.input, ...styles.textarea }}
                  placeholder={`Describe step ${index + 1}...`}
                  rows={3}
                />
                {formData.steps.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeField('steps', index)}
                    style={styles.removeButton}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Image Upload */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Recipe Image</h2>
            <div style={styles.formGroup}>
              <label style={styles.fileInputLabel}>
                <input
                  type="file"
                  onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.files[0] }))}
                  accept="image/*"
                  style={styles.fileInput}
                />
                <div style={styles.fileInputCustom}>
                  {formData.image ? formData.image.name : "Choose an image..."}
                </div>
              </label>
              {formData.image && (
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, image: null }))}
                  style={styles.removeImageButton}
                >
                  Remove
                </button>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={isSubmitting ? styles.submitButtonDisabled : styles.submitButton}
          >
            {isSubmitting ? "Submitting..." : "Submit Recipe"}
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    padding: "20px",
    fontFamily: "'Inter', sans-serif"
  },
  card: {
    width: "100%",
    maxWidth: "800px",
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    padding: "32px",
    margin: "20px 0"
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: "8px",
    textAlign: "center"
  },
  subtitle: {
    fontSize: "16px",
    color: "#666",
    textAlign: "center",
    marginBottom: "32px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "24px"
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    paddingBottom: "24px",
    borderBottom: "1px solid #eee"
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "12px"
  },
  sectionTitle: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#1a1a1a"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px"
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },
  label: {
    fontSize: "14px",
    fontWeight: "500",
    color: "black"
  },
  input: {
    width: "90%",
    padding: "12px",
    border: "1px solid #e0e0e0",
    backgroundColor: "white",
    color: "#333",
    borderRadius: "8px",
    fontSize: "14px",
    transition: "all 0.2s",
    ":focus": {
      outline: "none",
      borderColor: "#4f46e5",
      boxShadow: "0 0 0 2px rgba(79, 70, 229, 0.1)"
    }
  },
  textarea: {
    minHeight: "100px",
    resize: "vertical"
  },
  arrayItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    width: "100%"
  },
  stepNumber: {
    fontSize: "14px",
    fontWeight: "600",
    color: "black",
    marginTop: "12px"
  },
  addButton: {
    padding: "8px 12px",
    backgroundColor: "#f0f0f0",
    color: "#333",
    border: "none",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s",
    ":hover": {
      backgroundColor: "#e0e0e0"
    }
  },
  removeButton: {
    padding: "12px 14px",
    backgroundColor: "#ffebee",
    color: "#d32f2f",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s",
    ":hover": {
      backgroundColor: "#ffcdd2"
    }
  },
  fileInputLabel: {
    display: "block",
    cursor: "pointer"
  },
  fileInput: {
    display: "none"
  },
  fileInputCustom: {
    padding: "12px",
    border: "1px dashed #e0e0e0",
    borderRadius: "8px",
    backgroundColor: "#fafafa",
    textAlign: "center",
    color: "#666",
    transition: "all 0.2s",
    ":hover": {
      borderColor: "#4f46e5",
      backgroundColor: "#f5f3ff"
    }
  },
  removeImageButton: {
    marginTop: "8px",
    padding: "8px 12px",
    backgroundColor: "transparent",
    color: "#d32f2f",
    border: "1px solid #d32f2f",
    borderRadius: "6px",
    fontSize: "14px",
    cursor: "pointer",
    transition: "all 0.2s",
    ":hover": {
      backgroundColor: "#ffebee"
    }
  },
  submitButton: {
    padding: "14px",
    backgroundColor: "#c28c5c",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s",
    ":hover": {
      backgroundColor: "#4338ca"
    }
  },
  submitButtonDisabled: {
    padding: "14px",
    backgroundColor: "#a5b4fc",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "not-allowed"
  },
  error: {
    padding: "12px",
    backgroundColor: "#ffebee",
    color: "#d32f2f",
    borderRadius: "8px",
    marginBottom: "16px",
    fontSize: "14px"
  },
  success: {
    padding: "12px",
    backgroundColor: "#e8f5e9",
    color: "#2e7d32",
    borderRadius: "8px",
    marginBottom: "16px",
    fontSize: "14px"
  }
};

export default SubmitRecipe;