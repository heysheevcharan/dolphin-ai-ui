const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://flask-app-backend-672122151468.asia-south1.run.app';


const WORKFLOW_ENDPOINT = `${BACKEND_URL}/workflows`;


export const initiateWorkflowAPI = async (workflowName: string, data: any) => {
    try {
        const response = await fetch(`${WORKFLOW_ENDPOINT}/${workflowName}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Error initiating workflow: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error initiating workflow:', error);
        throw error;
    }
}


export const resumeWorkflowAPI = async (workflowName: string, sessionId: string, data: any) => {
    try {
        const response = await fetch(`${WORKFLOW_ENDPOINT}/${workflowName}/${sessionId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Error resuming workflow: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error resuming workflow:', error);
        throw error;
    }
}