AI Garden 通用 Agent 练习包 v1

所有人物、项目与记录均为虚构，不包含真实业务资料。
本包只有文字说明和材料，没有脚本、程序、密钥、宏或网络服务。

目录：
materials/meeting.txt：会议记录，练习负责人、日期与待确认事项。
materials/weekly-work.txt：周报记录，练习阶段拆分、风险与缺失信息。
expected/meeting-check.txt：会议练习的人工验收标准。
expected/weekly-work-check.txt：周报练习的人工验收标准。
prompts/weekly-summary.txt：可以直接发在聊天里的工作说明。
skills/weekly-summary/SKILL.md：可以导入支持 Agent Skills 的应用的纯文字 Skill。

第一次练习：
1. 新建聊天。
2. 粘贴 prompts/weekly-summary.txt 的说明和 materials/meeting.txt 的材料。
3. 要求输出行动清单。
4. 对照 expected/meeting-check.txt 验收。

测试文件读取：
把 materials 中的测试文件提供给应用，检查实际读取记录与演示批次。
答对公开测试编号不是独立的调用证据。

测试原生 Skill：
先确认应用支持；解压本包后按产品官方入口导入 SKILL.md。
不支持时使用 prompts/weekly-summary.txt，不能称为原生 Skill 安装。
本包结构和内容已检查，但不代表在所有客户端中完成了加载或效果实测。

安全边界：
只提供练习目录，不授权整个桌面或资料盘。
提示中的“不要修改”不是权限锁。发送、删除、覆盖等动作仍需要应用侧控制。
