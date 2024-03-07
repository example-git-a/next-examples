'use client'

const Spotlight = ({ children, isOn }: { children: React.ReactNode, isOn: boolean }) => {

    return (
        <div style={{
            position: 'relative',
            zIndex: isOn ? 2 : 1,
            borderRadius: '10px', // 丸い四角形を作る
            transition: 'all 0.5s ease', // スムーズな表示切り替え
            boxShadow: isOn
                ? '0 0 0 2000px rgba(0, 0, 0, 0.7), 0 0 20px rgba(0, 0, 0, 0.5)'
                : 'none',
        }}>
            {children}
        </div>
    );
};

export default Spotlight;
