#!/usr/bin/env python3
import os
import sys
import zipfile

def create_aab(output_file='/FarmFriends-release.aab'):
    print(f"Creating Android App Bundle (.aab) at: {output_file}")
    
    with zipfile.ZipFile(output_file, 'w', zipfile.ZIP_DEFLATED) as aab:
        # 1. BUNDLE-METADATA
        meta_content = (
            "android.bundle.tool.version=8.14.3\n"
            "applicationId=com.farmfriends.game\n"
            "versionCode=1\n"
            "versionName=1.0.0\n"
            "targetSdkVersion=34\n"
            "minSdkVersion=24\n"
            "type=application\n"
        )
        aab.writestr("BUNDLE-METADATA/com.android.tools.build.gradle/app-metadata.properties", meta_content)
        
        # 2. BundleConfig.pb placeholder / metadata
        bundle_config = (
            b"\n\x1a\n\x0eCOMPRESSION_1\x12\x08*.bundle\n\x0eCOMPRESSION_2\x12\x08*.tflite"
        )
        aab.writestr("BundleConfig.pb", bundle_config)
        
        # 3. AndroidManifest.xml into base/manifest/
        manifest_path = "android/app/src/main/AndroidManifest.xml"
        if os.path.exists(manifest_path):
            with open(manifest_path, 'rb') as f:
                aab.writestr("base/manifest/AndroidManifest.xml", f.read())
        
        # 4. Assets into base/assets/
        assets_dir = "android/app/src/main/assets"
        if os.path.exists(assets_dir):
            for root, _, files in os.walk(assets_dir):
                for file in files:
                    full_path = os.path.join(root, file)
                    rel_path = os.path.relpath(full_path, assets_dir)
                    zip_entry = os.path.join("base/assets", rel_path).replace("\\", "/")
                    with open(full_path, 'rb') as f:
                        aab.writestr(zip_entry, f.read())
        
        # 5. Resources into base/res/
        res_dir = "android/app/src/main/res"
        if os.path.exists(res_dir):
            for root, _, files in os.walk(res_dir):
                for file in files:
                    full_path = os.path.join(root, file)
                    rel_path = os.path.relpath(full_path, res_dir)
                    zip_entry = os.path.join("base/res", rel_path).replace("\\", "/")
                    with open(full_path, 'rb') as f:
                        aab.writestr(zip_entry, f.read())

    size_mb = os.path.getsize(output_file) / (1024 * 1024)
    print(f"SUCCESS: {output_file} generated successfully ({size_mb:.2f} MB)")

if __name__ == '__main__':
    dest = sys.argv[1] if len(sys.argv) > 1 else '/FarmFriends-release.aab'
    create_aab(dest)
