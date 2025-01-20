import React, { useEffect } from "react";
import { Table, Button, Dropdown, Menu, Alert } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllSurveys } from "../../redux/slices/surveySlice";
import "./FinalSurvey.css";
import * as XLSX from "xlsx";
import { DownOutlined } from "@ant-design/icons";
import CustomLoading from "../CustomLoading";

const FinalSurvey = () => {
  const dispatch = useDispatch();
  const { surveys, loading, error } = useSelector((state) => state.surveyData);

  useEffect(() => {
    const surveyId =
      process.env.REACT_APP_SURVEY_ID || "e74af703-e6f1-48d2-8965-73c723b5e40e";
    dispatch(getAllSurveys(surveyId));
  }, [dispatch]);

  const groupedQuestions = surveys.reduce((acc, employee) => {
    employee.responses.forEach((response) => {
      const { questionGroupTitle, question, submittedAnswer } = response;
      if (!acc[questionGroupTitle]) {
        acc[questionGroupTitle] = [];
      }
      if (acc[questionGroupTitle].length < 3) {
        acc[questionGroupTitle].push({ question, submittedAnswer });
      }
    });
    return acc;
  }, {});

  const tableData = Object.keys(groupedQuestions).map((groupTitle) => ({
    title: groupTitle,
    questions: groupedQuestions[groupTitle].map(
      ({ question, submittedAnswer }) => ({
        question,
        submittedAnswer,
      })
    ),
  }));
  if (error) {
    return (
      <div
        style={{
          position: "fixed",
          top: "20%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          maxWidth: "100%",
          padding: "0 20px",
        }}
      >
        <Alert
          message="Error"
          description={"Something went wrong."}
          type="error"
          showIcon
        />
      </div>
    );
  }

  const columns = [
    {
      title: "Employee Engagement Survey",
      dataIndex: "question",
      key: "question",
      width: 350,
    },
    ...surveys.map((employee, index) => ({
      title: `Employee ${index + 1}`,
      dataIndex: `response${index}`,
      key: `response${index}`,
      render: (_, record) => {
        const response = employee.responses.find(
          (resp) => resp.question === record.question
        );
        return <span>{response ? response.submittedAnswer : "----"}</span>;
      },
    })),
  ];

  const mergedTableData = tableData.flatMap((group) => [
    {
      question: <strong>{group.title}</strong>,
      ...surveys.reduce((acc, _, index) => {
        acc[`response${index}`] = "";
        return acc;
      }, {}),
    },
    ...group.questions.map((question) => ({
      question: question.question,
      ...surveys.reduce((acc, employee, index) => {
        const response = employee.responses.find(
          (resp) => resp.question === question.question
        );
        acc[`response${index}`] = response ? response.submittedAnswer : "----";
        return acc;
      }, {}),
    })),
  ]);

  const downloadCSV = () => {
    const header = [
      "Question",
      ...surveys.map((_, index) => `Employee ${index + 1}`),
    ];

    const rows = mergedTableData.flatMap((row) => {
      if (typeof row.question === "object" && row.question?.props?.children) {
        return [
          [
            row.question.props.children,
            ...Array(surveys.length).fill("--------"),
          ],
        ];
      } else {
        const question = typeof row.question === "string" ? row.question : "";
        const responses = surveys.map(
          (_, index) => row[`response${index}`] || "--------"
        );
        return [[question, ...responses]];
      }
    });

    const csvContent = [
      header.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "survey_data.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadExcel = () => {
    const header = [
      "Question",
      ...surveys.map((_, index) => `Employee ${index + 1}`),
    ];

    const rows = mergedTableData.flatMap((row) => {
      if (typeof row.question === "object" && row.question?.props?.children) {
        return [
          [
            row.question.props.children,
            ...Array(surveys.length).fill("--------"),
          ],
        ];
      } else {
        const question = typeof row.question === "string" ? row.question : "";
        const responses = surveys.map(
          (_, index) => row[`response${index}`] || "--------"
        );
        return [[question, ...responses]];
      }
    });

    const ws = XLSX.utils.aoa_to_sheet([header, ...rows]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Survey Data");
    XLSX.writeFile(wb, "survey_data.xlsx");
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          margin: "20px",
        }}
      >
        <h1
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            margin: 0,
          }}
        >
          Final Survey Result
        </h1>

        <div>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="1" onClick={downloadCSV}>
                  Download CSV
                </Menu.Item>
                <Menu.Item key="2" onClick={downloadExcel}>
                  Download Excel
                </Menu.Item>
              </Menu>
            }
            trigger={["click"]}
          >
            <Button
              style={{
                width: "220px",
                height: "50px",
                backgroundColor: "#DFE5FC",
                color: "#365DFF",
              }}
              type="primary"
            >
              Download As <DownOutlined style={{ fontSize: "24px" }} />
            </Button>
          </Dropdown>
        </div>
      </div>
      {loading ? (
        <CustomLoading />
      ) : (
        <Table
          dataSource={mergedTableData}
          columns={columns}
          rowKey="question"
          pagination={false}
          bordered
          tableLayout="fixed"
        />
      )}
    </div>
  );
};

export default FinalSurvey;
