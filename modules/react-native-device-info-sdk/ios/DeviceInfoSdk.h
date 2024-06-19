
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNDeviceInfoSdkSpec.h"

@interface DeviceInfoSdk : NSObject <NativeDeviceInfoSdkSpec>
#else
#import <React/RCTBridgeModule.h>

@interface DeviceInfoSdk : NSObject <RCTBridgeModule>
#endif

@end
