document.addEventListener('DOMContentLoaded', function() {
    const aiInput = document.getElementById('ai-input');
    const aiSubmit = document.getElementById('ai-submit');
    const aiOutput = document.getElementById('ai-output');

    aiSubmit.addEventListener('click', function() {
        const question = aiInput.value;
        if (question.trim() === '') {
            aiOutput.textContent = '请输入一个问题。';
            return;
        }

        // 这里应该是调用AI API的地方
        // 为了演示,我们只是简单地回显问题
        aiOutput.textContent = `你的问题是: ${question}\n\n这是一个AI生成的回答示例。在实际应用中,这里应该调用真正的AI API来生成回答。`;
    });
});